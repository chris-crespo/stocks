import { z } from "zod"
import { 
  CreateWatchlistFailure,
  CreateWatchlistFields, 
  CreateWatchlistSuccess, 
  Description, 
  GetWatchlistSuccess, 
  MyWatchlists, 
  Watchlist,
} from "../schemas"

export type TDescription = z.infer<typeof Description>

export type TWatchlist = z.infer<typeof Watchlist>

export type TCreateWatchlistFields = z.infer<typeof CreateWatchlistFields>

export type TCreateWatchlistSuccess = z.infer<typeof CreateWatchlistSuccess>

export type TCreateWatchlistFailure = z.infer<typeof CreateWatchlistFailure>

export type TGetWatchlistSuccess = z.infer<typeof GetWatchlistSuccess>

export type TMyWatchLists = z.infer<typeof MyWatchlists>

export type IsSelected<T> = T & { isSelected: boolean }
