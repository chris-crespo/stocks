import { useQuery } from "react-query";
import { QueryConfig } from "~/lib/react-query";
import { authd } from "~/lib/wretch";
import { BaseFailure } from "~/schemas";
import { parseFailure } from "~/utils/api";
import { GetWatchlistSuccess } from "../schemas";
import { TGetWatchlistSuccess } from "../types";

type WatchlistNotFound = {
  status: 'error',
  message: string
}

export const getWatchlist = ({ id }: { id: string }) =>
  authd(`/api/watchlists/${id}`)
    .get()
    .notFound(parseFailure(BaseFailure()))
    .json(GetWatchlistSuccess.parse)

type UseWatchlistOptions = {
  id: string,
  config?: QueryConfig<TGetWatchlistSuccess, WatchlistNotFound>
}

export const useWatchlist = ({ id, config }: UseWatchlistOptions) =>
  useQuery<TGetWatchlistSuccess, WatchlistNotFound>({
    ...config,
    queryKey: ['watchlists', id],
    queryFn: () => getWatchlist({ id })
  })
