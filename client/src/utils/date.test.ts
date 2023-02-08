import { describe, expect, test } from "vitest"
import { previousDay } from "./date"

describe('previousDay', () => {
  test('computes the date previous to the given date', () => {
    const date = new Date('2023-10-11')

    const expected = new Date('2023-10-10')
    const actual = previousDay(date)

    expect(actual).toBe(expected)
  })
})
