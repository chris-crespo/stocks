import clsx from "clsx"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { Table } from "~/components/Elements"
import { TSymbol } from "~/features/assets"
import { TName, TPrice } from "~/types"
import { TGrowth, TMarketAsset } from "../types"

type NameProps = {
  name: TName,
  symbol: TSymbol
}

const Name = ({ name, symbol }: NameProps) => (
  <div className="flex">
    <div className="max-w-xs truncate">
      <span className="shrink-0 font-medium mr-1.5">{name}</span>
    </div>
    {' '}
    <span className="text-gray-400">{symbol}</span>
  </div>
)

type PriceProps = {
  price: TPrice
}

const Price = ({ price }: PriceProps) => (
  <div className="text-right">
    <span>${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: price > 1 ? 2 : undefined
    })}</span>
  </div>
)

type PercentProps = {
  growth: TGrowth
}

const Growth = ({ growth }: PercentProps) => {
  const isNegative = growth < 0

  return (
    <div className={clsx(
      "flex items-center justify-end",
      isNegative ? "text-red-600" : "text-green-600"
    )}>
      <span className="text-xs">{isNegative ? <AiFillCaretDown /> : <AiFillCaretUp />}</span>
      <span>{Math.abs(growth).toFixed(2)}%</span>
    </div>
  )
}

type AssetsListProps = {
  assets: TMarketAsset[]
}

const AssetsList = ({ assets }: AssetsListProps) => (
  <Table<TMarketAsset>
    data={assets}
    columns={[
      {
        title: 'Name',
        Cell: ({ entry: { name, symbol } }) => (
          <Name name={name} symbol={symbol} />
        )
      },
      {
        title: 'Price',
        align: 'right',
        Cell: ({ entry: { price } }) => (
          <Price price={price} />
        )
      },
      {
        title: 'Market cap',
        align: 'right',
        Cell: ({ entry: { marketCap } }) => (
          <Price price={marketCap} />
        )
      },
      {
        title: '1h %',
        align: 'right',
        Cell: ({ entry: { lastHourGrowth } }) => (
          <Growth growth={lastHourGrowth} />
        )
      },
      {
        title: '24h %',
        align: 'right',
        Cell: ({ entry: { lastDayGrowth } }) => (
          <Growth growth={lastDayGrowth} />
        )
      },
      {
        title: '7d %',
        align: 'right',
        Cell: ({ entry: { lastWeekGrowth } }) => (
          <Growth growth={lastWeekGrowth} />
        )
      }
    ]}
  />
)

export default AssetsList
