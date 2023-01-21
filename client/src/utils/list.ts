import { diff } from "./number";


export const range = (a: number, b: number) => 
  Array.from({ length: diff(a, b) }, (_, i) => i + a)

export const isEmpty = (list: unknown[]) => list.length === 0

export const isLastIndex = (i: number, list: unknown[]) => i === list.length - 1
