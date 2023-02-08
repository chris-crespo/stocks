import { linearGradientDef } from '@nivo/core'
import { ResponsiveLine } from '@nivo/line'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { TAsset } from "~/features/assets"
import { TAssetPrice } from '~/features/market'
import { useLastAssetPrices } from '~/features/market/api/getLastAssetPrices'
import { getCurrentDay, getWeekday, listDaysFromNow, parseDay, parseShortWeekday } from '~/utils/date'
import { Lazy } from '~/utils/generator'
import { groupBy, product, range } from '~/utils/list'
import { formatNumber } from '~/utils/string'
import { getCurrentHour, parseTime } from '~/utils/time'
import WatchlistFilter from './WatchlistFilter'

const getLast24Hours = ({ step }: { step: number }) => {
  const currentHour = getCurrentHour()
  const postMidnightStart = step - (24 - currentHour) % step

  const preMidnightHours = range(currentHour, 24, step)
  const postMidnightHours = range(postMidnightStart, currentHour, step)
  const hours = [...preMidnightHours, ...postMidnightHours]

  return hours
}

const getLastWeekdays = () => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const currentDay = getCurrentDay()
  const days = [...range(currentDay + 1, 8), ...range(1, currentDay + 1)]

  return days.map(day => weekdays[day - 1])
}

const getLastDayTickValues = () => {
  const hours = getLast24Hours({ step: 2 })
  return hours.map(hour => `${formatNumber(hour, { minimumDigits: 2 })}:00`)
}

const getLastWeekTickValues = () => {
  const hours = getLast24Hours({ step: 12 }).sort((a, b) => a - b)
  const weekdays = getLastWeekdays()

  return product(weekdays, hours).map(([weekday, hour]) => {
    return `${weekday} ${formatNumber(hour, { minimumDigits: 2 })}:00`
  })
}

const getLastMonthTickValues = () => {
  const lastMonthDays = listDaysFromNow(30)
  return Lazy.of(...lastMonthDays)
    .stepBy(7)
    .map(date => `${getWeekday(date)} ${date.getDate()} 00:00`)
    .toList()
}

const getTickValues = (span: Span) => {
  switch (span) {
    case 'day': return getLastDayTickValues()
    case 'week': return getLastWeekTickValues()
    case 'month': return getLastMonthTickValues()
  }
}

const groupSymbolData = (data: TAssetPrice[]) => {
  const pricesPerSymbol = groupBy('symbol', data)
  return Object.entries(pricesPerSymbol)
}

const mapLastDaySymbolData = (symbol: string, data: TAssetPrice[]) => ({
  id: symbol,
  data: data.map(({ price, date }) => ({
    x: `${parseTime(date)}`,
    y: price.toFixed(2)
  }))
})

const mapLastWeekSymbolData = (symbol: string, data: TAssetPrice[]) => ({
  id: symbol,
  data: data.map(({ price, date }) => ({
    x: `${parseShortWeekday(date)} ${parseTime(date)}`,
    y: price.toFixed(2)
  }))
})

const mapLastMonthSymbolData = (symbol: string, data: TAssetPrice[]) => ({
  id: symbol,
  data: data.map(({ price, date }) => ({
    x: `${parseShortWeekday(date)} ${parseDay(date)} ${parseTime(date)}`,
    y: price.toFixed(2)
  }))
})

const processLastDayChartData = (data: TAssetPrice[]) => {
  return groupSymbolData(data).map(([symbol, data]) => {
    return mapLastDaySymbolData(symbol, data)
  })
}

const processLastWeekChartData = (data: TAssetPrice[]) => {
  return groupSymbolData(data).map(([symbol, data]) => {
    return mapLastWeekSymbolData(symbol, data)
  })
}

const processLastMonthChartData = (data: TAssetPrice[]) => {
  return groupSymbolData(data).map(([symbol, data]) => {
    return mapLastMonthSymbolData(symbol, data)
  })
}

const processChartData = (data: TAssetPrice[], span: Span) => {
  switch (span) {
    case 'day': return processLastDayChartData(data)
    case 'week': return processLastWeekChartData(data)
    case 'month': return processLastMonthChartData(data)
  }
}

type Props = {
  assets: TAsset[]
  onDropAsset: (asset: TAsset) => void
}

type Span = 'day' | 'week' | 'month'

const AssetsChart = ({ assets, onDropAsset }: Props) => {
  const [span, setSpan] = useState<Span>('day')
  const { data, isLoading } = useLastAssetPrices({
    assets,
    span,
    config: {
      refetchInterval: 10000
    }
  });

  const chartData = processChartData(data?.data.prices ?? [], span)
  const tickValues = getTickValues(span)

  const [, drop] = useDrop<TAsset>(() => ({
    accept: 'AssetCard',
    drop: asset => {
      onDropAsset(asset)
    }
  }), [onDropAsset])

  return (
    <div ref={drop} className="w-full h-full max-h-[560px]">
      <div className='ml-[50px]'>
        <WatchlistFilter selected={span === 'day'} onClick={() => setSpan('day')}>
          1 day
        </WatchlistFilter>
        <WatchlistFilter selected={span === 'week'} onClick={() => setSpan('week')} >
          1 week
        </WatchlistFilter>
        <WatchlistFilter selected={span === 'month'} onClick={() => setSpan('month')} >
          1 month
        </WatchlistFilter>
      </div >
      {
        assets.length === 0
          ? (
            <div className="bg-gray-100 h-full rounded-lg">
              <div className="h-full text-gray-400 flex items-center justify-center">
                Select or drag an asset to begin
              </div>
            </div>
          )
          : isLoading
            ? <div className="bg-gray-100 h-full w-full" /> : (
              <div className='w-full h-full'>
                <ResponsiveLine
                  data={chartData}
                  margin={{ top: 20, left: 50, bottom: 50, right: 50 }}
                  curve="cardinal"
                  enablePoints={false}
                  colors={{ scheme: 'pastel1' }}
                  useMesh={true}
                  defs={[
                    linearGradientDef('gradientA', [
                      { offset: 0, color: 'inherit' },
                      { offset: 50, color: 'inherit', opacity: .2 },
                      { offset: 100, color: 'inherit', opacity: 0 }
                    ]),
                  ]}
                  fill={[
                    { match: '*', id: 'gradientA' }
                  ]}
                  axisBottom={{
                    tickValues
                  }}
                  enableArea={true}
                  enableGridX={false}
                  enableGridY={false}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      translateX: 20,
                      translateY: -20,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    }
                  ]}
                />
              </div>)
      }
    </div >
  )
}

export default AssetsChart
