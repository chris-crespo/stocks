import { useQuery } from "react-query"
import { z } from "zod"
import { TAsset, TSymbol } from "~/features/assets"
import { QueryConfig } from "~/lib/react-query"
import { authd } from "~/lib/wretch"
import { BaseSuccess } from "~/schemas"
import { AssetPrice } from "../schemas"

const LastAssetPrices = BaseSuccess({
  prices: AssetPrice.array()
})

type GetLastAssetPricesRequest = {
  symbols: TSymbol[]
  span: 'day' | 'week' | 'month'
}

export const getLastAssetPrices = ({ symbols, span }: GetLastAssetPricesRequest) => {
  const queryParams = [...symbols.map(symbol => `symbol[]=${symbol}`), `span=${span}`].join('&')
  return authd(`/api/market/last-prices?${queryParams}`)
    .get()
    .json(LastAssetPrices.parse)
}

type LastAssetPrices = z.infer<typeof LastAssetPrices>

type UseLastAssetPricesOptions = {
  assets: TAsset[]
  span: 'day' | 'week' | 'month'
  config?: QueryConfig<LastAssetPrices>
}

export const useLastAssetPrices = ({ 
  assets, 
  span,
  config 
}: UseLastAssetPricesOptions) => {
  const symbols = assets.map(asset => asset.symbol)
  return useQuery<LastAssetPrices>({
    ...config,
    queryKey: ['market', 'last-day', { symbols, span }],
    queryFn: () => getLastAssetPrices({ symbols, span })
  })
}
