import { z } from "zod"
import { Asset, Symbol } from "~/features/assets"
import { BasePaginated, Name, Price } from "~/schemas"

export const Growth = z.preprocess(Number, z.number().brand<'Growth'>())

export const MarketAsset = Asset.extend({
  price: Price,
  marketCap: Price,
  lastHourGrowth: Growth,
  lastDayGrowth: Growth,
  lastWeekGrowth: Growth
})

export const AssetPrice = z.object({
  name: Name,
  symbol: Symbol,
  price: Price,
  date: z.string()
})

export const PaginatedMarketAssets = BasePaginated(MarketAsset)
