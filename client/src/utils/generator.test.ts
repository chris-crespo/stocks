import { describe, expect, test } from "vitest"
import { toList, map, takeWhile, unfold } from "./generator"

// TODO: fix `tslib` module issue, or tests will break!
describe('unfold', () => {
  test('generates a sequence of elements', () => {
    const fibs = unfold([0, 1], ([a, b]) => [b, a + b])
    expect(fibs.next().value).toEqual([0, 1])
    expect(fibs.next().value).toEqual([1, 1])
    expect(fibs.next().value).toEqual([1, 2])
    expect(fibs.next().value).toEqual([2, 3])
    expect(fibs.next().value).toEqual([3, 5])
  })
})

describe('map', () => {
  test('maps the elements of a generator', () => {
    const fibs = map(([x]) => x, unfold([0, 1], ([a, b]) => [b, a + b]))
    expect(fibs.next().value).toEqual(0)
    expect(fibs.next().value).toEqual(1)
    expect(fibs.next().value).toEqual(1)
    expect(fibs.next().value).toEqual(2)
    expect(fibs.next().value).toEqual(3)
  })
})

describe('takeWhile', () => {
  test('takes the elements of a generator while the predicate succeeds', () => {
    const fibs = map(([x]) => x, unfold([0, 1], ([a, b]) => [b, a + b]))
    const tenthFib = 55
    const firstTenFibs = takeWhile(x => x <= tenthFib, fibs);
    expect(toList(firstTenFibs)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
  })
})
