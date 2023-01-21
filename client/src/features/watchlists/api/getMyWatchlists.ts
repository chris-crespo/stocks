import { useQuery } from "react-query";
import { QueryConfig } from "~/lib/react-query";
import { authd } from "~/lib/wretch";
import { PaginationParams } from "~/types";
import { queryString } from "~/utils/api";
import { MyWatchlists } from "../schemas";
import { TMyWatchLists } from "../types";

export const fetchMyWatchlists = (params: PaginationParams) => {
  return authd(`/api/watchlists/my?${queryString(params)}`)
    .get()
    .json(MyWatchlists.parse)
}

type UseMyWatchlistsOptions = PaginationParams & {
  config?: QueryConfig<TMyWatchLists>
}

export const useMyWatchlists = ({ 
  page, 
  size,
  searchTerm, 
  config 
}: UseMyWatchlistsOptions) => {
  return useQuery<TMyWatchLists>({
    queryKey: ['watchlists', 'my', { page, size, searchTerm }],
    queryFn: () => fetchMyWatchlists({ page, size, searchTerm }),
    ...config
  })
}

