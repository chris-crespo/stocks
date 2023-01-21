import { Entries } from "~/types"

export const entries = <T extends {}>(obj: T): Entries<T> => {
  return Object.entries(obj) as Entries<T>
}
