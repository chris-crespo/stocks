import { z } from "zod";
import { 
  Growth,
  MarketAsset,
  PaginatedMarketAssets,
} from "../schemas";

export type TGrowth = z.infer<typeof Growth>

export type TMarketAsset = z.infer<typeof MarketAsset>

export type TPaginatedMarketAssets = z.infer<typeof PaginatedMarketAssets>
