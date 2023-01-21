import { useQuery } from "react-query";
import { QueryConfig } from "~/lib/react-query";
import { authd } from "~/lib/wretch";
import { GetWatchlistSuccess } from "../schemas";
import { TGetWatchlistSuccess } from "../types";

export const getWatchlist = ({ id }: { id: string }) =>
  authd(`/api/watchlists/${id}`)
    .get()
    .json(GetWatchlistSuccess.parse)

type UseWatchlistOptions = {
  id: string,
  config?: QueryConfig<TGetWatchlistSuccess>
}

export const useWatchlist = ({ id, config }: UseWatchlistOptions) =>
  useQuery<TGetWatchlistSuccess>({
    ...config,
    queryKey: ['watchlists', id],
    queryFn: () => getWatchlist({ id })
  })
