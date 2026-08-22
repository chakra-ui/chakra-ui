import { describe, expect, test } from "vitest"
import { cx } from "../src/utils/cx"

describe("cx", () => {
  test("combines multiple class names", () => {
    expect(cx("foo", "bar", "baz")).toBe("foo bar baz")
  })

  test("filters out falsy values", () => {
    expect(cx("foo", null, "bar", undefined, "baz", false)).toBe("foo bar baz")
    expect(cx("foo", "", "bar")).toBe("foo bar")
  })

  test("trims whitespace from class names", () => {
    expect(cx("  foo  ", "  bar  ", "  baz  ")).toBe("foo bar baz")
    expect(cx("foo", " bar ", "baz")).toBe("foo bar baz")
  })

  test("filters out whitespace-only strings", () => {
    expect(cx("foo", " ", "bar")).toBe("foo bar")
    expect(cx("foo", "   ", "bar")).toBe("foo bar")
    expect(cx("foo", "\t", "bar")).toBe("foo bar")
    expect(cx("foo", "\n", "bar")).toBe("foo bar")
    expect(cx(" ", "foo", " ", "bar", " ")).toBe("foo bar")
  })

  test("handles mixed whitespace and valid class names", () => {
    expect(cx("foo", " ", "bar", "  ", "baz")).toBe("foo bar baz")
    expect(cx("  ", "foo", "bar", "   ")).toBe("foo bar")
  })

  test("handles empty string", () => {
    expect(cx("foo", "", "bar")).toBe("foo bar")
    expect(cx("", "foo", "")).toBe("foo")
  })

  test("handles all falsy values", () => {
    expect(cx(null, undefined, false, 0, "", "foo")).toBe("foo")
  })

  test("handles zero as a class name (edge case)", () => {
    // Note: 0 is falsy, so it will be filtered out
    expect(cx("foo", 0, "bar")).toBe("foo bar")
  })

  test("returns empty string when all inputs are falsy", () => {
    expect(cx(null, undefined, false, "", " ")).toBe("")
    expect(cx()).toBe("")
  })

  test("handles class names with internal spaces", () => {
    // Internal spaces should be preserved (only trimmed from edges)
    expect(cx("foo bar", "baz qux")).toBe("foo bar baz qux")
  })
})
