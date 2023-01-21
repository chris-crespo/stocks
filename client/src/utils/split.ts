import { Predicate } from "~/types"

export const splitWhen = <T>(list: T[], pred: Predicate<T>) => {
  const result = []
  let lastIndex = 0

  for (let i = 0; i < list.length; i++) {
    if (pred(list[i])) result.push(list.slice(lastIndex, i + 1))
  }

  return result
}
