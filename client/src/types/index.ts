import { z } from "zod"
import { 
  BaseFailure, 
  Message, 
  Messages, 
  Name, 
  Success, 
  Url,
  Amount,
  Id,
  Price
} from "~/schemas"

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type Filter<Source, Condition> = Pick<
  Source,
  { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>

export type Stringable = string | number | boolean

export type Predicate<T> = (value: T) => boolean

export type TSuccess = z.infer<typeof Success>

export type TMessage = z.infer<typeof Message>
export type TMessages = z.infer<typeof Messages>

export type TId = z.infer<typeof Id>

export type TName = z.infer<typeof Name>

export type TPrice = z.infer<typeof Price>

export type TUrl = z.infer<typeof Url>

export type TAmount = z.infer<typeof Amount>

export type TBaseFailure = z.infer<ReturnType<typeof BaseFailure>>

export type TPage<T> = {
  data: T[],
  total: TAmount
}

export type TBasePaginated<T> = {
  status: TSuccess,
  data: {
    page: TPage<T>
  }
}

export type PaginationParams = {
  page: number,
  size: number,
  searchTerm?: string
}
