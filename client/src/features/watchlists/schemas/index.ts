import { z } from "zod";
import { Asset } from "~/features/assets";
import { 
  BaseFailure, 
  BasePaginated, 
  BaseSuccess, 
  Id, 
  Messages, 
  Name, 
} from "~/schemas";

const WatchlistName = Name.refine(name => name.length <= 20, {
  message: 'The name cannot be greater than 20 characters.'
})

export const Description = z.string().nullable().brand<'Description'>()

export const Watchlist = z.object({
  id: Id,
  name: WatchlistName,
  description: Description,
  cryptos: Asset.array(),
  stocks: Asset.array()
})

export const CreateWatchlistFields = z.object({
  name: WatchlistName,
  description: Description,
  cryptos: Asset.array(),
  stocks: Asset.array()
})

export const CreateWatchlistSuccess = BaseSuccess({ watchlist: Watchlist })

export const CreateWatchlistFailure = BaseFailure({
  name: Messages,
  description: Messages
})

export const GetWatchlistSuccess = BaseSuccess({ watchlist: Watchlist })

export const MyWatchlists = BasePaginated(Watchlist)
