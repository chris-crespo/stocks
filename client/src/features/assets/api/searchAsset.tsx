import { useQuery } from "react-query"
import { QueryConfig } from "~/lib/react-query"
import { authd } from "~/lib/wretch"
import { PaginationParams } from "~/types"
import { queryString } from "~/utils/api"
import { PaginatedAssets } from "../schemas"
import { AssetKind, TPaginatedAssets } from "../types"

type PaginationParamsWithoutSize = Omit<PaginationParams, 'size'>

export const searchAssets = (kind: AssetKind, params: PaginationParamsWithoutSize) => {
  return authd(`/api/${kind}s/search?${queryString(params)}`)
    .get()
    .json(PaginatedAssets.parse)
}

type UseSearchAssetsOptions = PaginationParamsWithoutSize & {
  kind: AssetKind,
  config?: QueryConfig<TPaginatedAssets>
}

export const useSearchAssets = ({
  config,
  kind,
  ...params
}: UseSearchAssetsOptions) => {
  return useQuery<TPaginatedAssets>({
    ...config,
    queryKey: [`${kind}s`, 'search', params],
    queryFn: () => searchAssets(kind, params),
  })
}
