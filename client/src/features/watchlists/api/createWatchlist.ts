import { useMutation } from "react-query"
import { MutationConfig, queryClient } from "~/lib/react-query"
import { resultify } from "~/lib/result"
import { authd } from "~/lib/wretch"
import { TId, TName } from "~/types"
import { parseFailure } from "~/utils/api"
import { CreateWatchlistFailure, CreateWatchlistSuccess } from "../schemas"
import { 
  TCreateWatchlistFailure, 
  TCreateWatchlistSuccess, 
  TDescription 
} from "../types"

type CreateWatchlistRequest = {
  name: TName,
  description: TDescription,
  cryptos: TId[]
  stocks: TId[]
}

export const createWatchlist = (request: CreateWatchlistRequest) => 
  resultify<TCreateWatchlistSuccess, TCreateWatchlistFailure>(authd('/api/watchlists')
    .post(request)
    .error(422, parseFailure(CreateWatchlistFailure))
    .json(CreateWatchlistSuccess.parse))

type UseCreateWatchlistOptions = {
  config?: MutationConfig<TCreateWatchlistSuccess, TCreateWatchlistFailure>
}

export const useCreateWatchlist = ({ config }: UseCreateWatchlistOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['watchlists'])
    },
    ...config,
    mutationFn: createWatchlist
  })
}
