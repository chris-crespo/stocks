import { z } from "zod";
import { 
  AssetPrice,
  Growth,
  MarketAsset,
  PaginatedMarketAssets,
} from "../schemas";

export type TGrowth = z.infer<typeof Growth>

export type TMarketAsset = z.infer<typeof MarketAsset>

export type TAssetPrice = z.infer<typeof AssetPrice>

export type TPaginatedMarketAssets = z.infer<typeof PaginatedMarketAssets>
