import { useQuery } from "react-query";
import { AssetKind } from "~/features/assets";
import { QueryConfig } from "~/lib/react-query";
import { authd } from "~/lib/wretch";
import { PaginationParams } from "~/types";
import { queryString } from "~/utils/api";
import { PaginatedMarketAssets } from "../schemas";
import { TPaginatedMarketAssets } from "../types";

const makePaginatedMarketAssetsFetcher = (kind: AssetKind) => (params: PaginationParams) => {
  return authd(`/api/market/${kind}s?${queryString(params)}`)
    .get()
    .json(PaginatedMarketAssets.parse)
}

export const getPaginatedCryptos = makePaginatedMarketAssetsFetcher('crypto')
export const getPaginatedStocks = makePaginatedMarketAssetsFetcher('stock')

type UsePaginatedMarketAssetsOptions = PaginationParams & {
  config?: QueryConfig<TPaginatedMarketAssets>
}

export const usePaginatedCryptos = ({ 
  config,
  ...params
}: UsePaginatedMarketAssetsOptions) => {
  return useQuery<TPaginatedMarketAssets>({
    ...config,
    queryKey: ['market', 'cryptos', params],
    queryFn: () => getPaginatedCryptos(params)
  })
}

export const usePaginatedStocks = ({
  config,
  ...params
}: UsePaginatedMarketAssetsOptions) => {
  return useQuery<TPaginatedMarketAssets>({
    ...config,
    queryKey: ['market', 'stocks', params],
    queryFn: () => getPaginatedStocks(params)
  })
}
