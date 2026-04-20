import { describe, expect, test } from "vitest"
import { isCssUnit } from "../src/utils/unit"

describe("isCssUnit", () => {
  test("accepts valid CSS length values", () => {
    expect(isCssUnit("12px")).toBe(true)
    expect(isCssUnit("1.5rem")).toBe(true)
    expect(isCssUnit("-.5em")).toBe(true)
    expect(isCssUnit("1e3px")).toBe(true)
    expect(isCssUnit("100%")).toBe(true)
  })

  test("rejects invalid decimal separators", () => {
    expect(isCssUnit("1a5rem")).toBe(false)
    expect(isCssUnit("1-5rem")).toBe(false)
    expect(isCssUnit("12 px")).toBe(false)
  })
})
