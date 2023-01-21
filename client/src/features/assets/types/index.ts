import { z } from "zod"
import { Asset, PaginatedAssets, Symbol } from "../schemas"

export type TAsset = z.infer<typeof Asset>

export type AssetKind = 'crypto' | 'stock'

export type TSymbol = z.infer<typeof Symbol>

export type TPaginatedAssets = z.infer<typeof PaginatedAssets>
