import { describe, test, expect } from 'vitest'
import { range } from "./list"

describe('range', () => {
  test('generates a sequence from `a` to `b`', () => {
    const seq = range(4, 8)
    const expected = [4, 5, 6, 7]
    expect(seq).toEqual(expected)
  })
})
