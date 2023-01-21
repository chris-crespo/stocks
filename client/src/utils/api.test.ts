import { describe, test, expect } from "vitest"
import { queryString } from "./api"

describe('queryString', () => {
  test('converts an object to a query string', () => {
    const given = { x: 1, y: true }
    const expected = "x=1&y=true" 
    expect(queryString(given)).toEqual(expected)
  })
})

