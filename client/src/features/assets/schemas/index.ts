import { z } from "zod"
import { Id, Name, BasePaginated } from "~/schemas";

export const Symbol = z.string().min(1).brand<'Symbol'>()

export const Asset = z.object({
  id: Id,
  name: Name,
  symbol: Symbol
})

export const PaginatedAssets = BasePaginated(Asset)
