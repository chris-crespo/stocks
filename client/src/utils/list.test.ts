import { describe, test, expect } from 'vitest'
import { groupBy, product, range } from "./list"

describe('range', () => {
  test('generates a sequence from `a` to `b`', () => {
    const seq = range(4, 8)
    const expected = [4, 5, 6, 7]
    expect(seq).toEqual(expected)
  })
})

describe('groupBy', () => {
  const key = 'name'
  const objs = [
    { name: 'x', value: 10 },
    { name: 'x', value: 20 },
    { name: 'y', value: 10 }
  ]

  test('groups a list of objects using a common key', () => {
    const expected = {
      x: [{ name: 'x', value: 10 }, { name: 'x', value: 20 }],
      y: [{ name: 'y', value: 10 }]
    }

    expect(groupBy(key, objs)).toEqual(expected)
  })
})

describe('product', () => {
  const xs = [1,2]
  const ys = [1,2]

  test('performs the cross product of two lists', () => {
    const expected = [[1,1], [1,2], [2,1], [2,2]]
    expect(product(xs, ys)).toEqual(expected)
  })
})
