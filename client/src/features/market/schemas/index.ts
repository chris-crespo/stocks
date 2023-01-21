import { z } from "zod"
import { Asset } from "~/features/assets"
import { BasePaginated, Price } from "~/schemas"

export const Growth = z.preprocess(Number, z.number().brand<'Growth'>())

export const MarketAsset = Asset.extend({
  price: Price,
  marketCap: Price,
  lastHourGrowth: Growth,
  lastDayGrowth: Growth,
  lastWeekGrowth: Growth
})

export const PaginatedMarketAssets = BasePaginated(MarketAsset)
