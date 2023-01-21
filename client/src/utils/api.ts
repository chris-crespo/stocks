import { ZodSchema } from "zod"
import { Stringable } from "~/types"

export const queryString = (obj: Record<string, Stringable>) => 
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

export const parseFailure = (schema: ZodSchema) => (err: unknown) => {
  if (err instanceof Error) {
    throw schema.parse(JSON.parse(err.message))
  }
}

