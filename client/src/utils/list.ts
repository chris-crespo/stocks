import { diff } from "./number";

export const range = (a: number, b: number, step: number = 1) => 
  Array.from({ length: Math.ceil(diff(a, b) / step) }, (_, i) => i * step + a)

export const isEmpty = (list: unknown[]) => list.length === 0

export const isLastIndex = (i: number, list: unknown[]) => i === list.length - 1

export const groupBy = <
  R extends { [P in K]: string }, 
  K extends keyof R = keyof R,
>(key: K, list: R[]) => {
  const groups: Record<R[K], R[]> = {} as Record<R[K], R[]>
  for (const item of list) {
    const value = item[key]
    if (value in groups) {
      groups[value].push(item)
    } else {
      groups[value] = [item]
    }
  }

  return groups
}

export const product = <T, U>(xs: T[], ys: U[]): [T, U][] => {
  return xs.flatMap(x => ys.map(y => [x, y])) as [T, U][]
}
