import { describe, expect, it } from "vitest"
import {
  compact,
  createSplitProps,
  extractThemingProps,
  filterObject,
  isHtmlProp,
  omit,
  omitThemingProps,
  pick,
  splitProps,
} from "../src/prop-utils"

describe("prop-utils", () => {
  describe("splitProps", () => {
    it("splits props based on predicate function", () => {
      const props = {
        color: "red",
        onClick: () => {},
        padding: 4,
        disabled: true,
      }
      const [matched, remaining] = splitProps(
        props,
        (key) => key === "color" || key === "padding",
      )

      expect(matched).toEqual({ color: "red", padding: 4 })
      expect(remaining).toEqual({
        onClick: expect.any(Function),
        disabled: true,
      })
    })

    it("splits props based on array of keys", () => {
      const props = { color: "red", onClick: () => {}, padding: 4 }
      const [matched, remaining] = splitProps(props, ["color", "padding"])

      expect(matched).toEqual({ color: "red", padding: 4 })
      expect(remaining).toEqual({ onClick: expect.any(Function) })
    })

    it("handles empty props", () => {
      const [matched, remaining] = splitProps({}, ["color"])

      expect(matched).toEqual({})
      expect(remaining).toEqual({})
    })

    it("handles no matches", () => {
      const props = { onClick: () => {} }
      const [matched, remaining] = splitProps(props, ["color"])

      expect(matched).toEqual({})
      expect(remaining).toEqual({ onClick: expect.any(Function) })
    })
  })

  describe("createSplitProps", () => {
    it("creates a reusable split function", () => {
      const splitStyleProps = createSplitProps(["color", "padding"] as const)
      const props = { color: "red", onClick: () => {}, padding: 4 }

      const [styleProps, rest] = splitStyleProps(props)

      expect(styleProps).toEqual({ color: "red", padding: 4 })
      expect(rest).toEqual({ onClick: expect.any(Function) })
    })
  })

  describe("omitThemingProps", () => {
    it("removes theming props from object", () => {
      const props = {
        variant: "solid",
        size: "md",
        colorPalette: "blue",
        onClick: () => {},
        disabled: true,
      }

      const result = omitThemingProps(props)

      expect(result).toEqual({
        onClick: expect.any(Function),
        disabled: true,
      })
    })

    it("handles colorScheme alias", () => {
      const props = {
        colorScheme: "blue",
        onClick: () => {},
      }

      const result = omitThemingProps(props as any)

      expect(result).toEqual({
        onClick: expect.any(Function),
      })
    })

    it("handles styleConfig prop", () => {
      const props = {
        styleConfig: { baseStyle: {} },
        onClick: () => {},
      }

      const result = omitThemingProps(props)

      expect(result).toEqual({
        onClick: expect.any(Function),
      })
    })

    it("handles empty object", () => {
      const result = omitThemingProps({})
      expect(result).toEqual({})
    })
  })

  describe("extractThemingProps", () => {
    it("extracts theming props from object", () => {
      const props = {
        variant: "solid",
        size: "md",
        colorPalette: "blue",
        onClick: () => {},
      }

      const result = extractThemingProps(props)

      expect(result).toEqual({
        variant: "solid",
        size: "md",
        colorPalette: "blue",
      })
    })

    it("handles colorScheme alias", () => {
      const props = {
        colorScheme: "blue",
        onClick: () => {},
      }

      const result = extractThemingProps(props as any)

      expect(result).toEqual({
        colorPalette: "blue",
      })
    })

    it("handles undefined values", () => {
      const props = {
        variant: undefined,
        onClick: () => {},
      }

      const result = extractThemingProps(props)

      expect(result).toEqual({})
    })
  })

  describe("omit", () => {
    it("removes specified keys from object", () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = omit(obj, ["a", "c"])

      expect(result).toEqual({ b: 2 })
    })

    it("handles missing keys", () => {
      const obj = { a: 1, b: 2 }
      const result = omit(obj, ["c" as any])

      expect(result).toEqual({ a: 1, b: 2 })
    })

    it("handles empty keys array", () => {
      const obj = { a: 1, b: 2 }
      const result = omit(obj, [])

      expect(result).toEqual({ a: 1, b: 2 })
    })
  })

  describe("pick", () => {
    it("picks specified keys from object", () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = pick(obj, ["a", "c"])

      expect(result).toEqual({ a: 1, c: 3 })
    })

    it("handles missing keys", () => {
      const obj = { a: 1, b: 2 }
      const result = pick(obj, ["a", "c" as any])

      expect(result).toEqual({ a: 1 })
    })

    it("handles empty keys array", () => {
      const obj = { a: 1, b: 2 }
      const result = pick(obj, [])

      expect(result).toEqual({})
    })
  })

  describe("compact", () => {
    it("removes undefined values", () => {
      const obj = { a: 1, b: undefined, c: 3 }
      const result = compact(obj)

      expect(result).toEqual({ a: 1, c: 3 })
    })

    it("removes null values", () => {
      const obj = { a: 1, b: null, c: 3 }
      const result = compact(obj)

      expect(result).toEqual({ a: 1, c: 3 })
    })

    it("keeps falsy values like 0 and empty string", () => {
      const obj = { a: 0, b: "", c: false }
      const result = compact(obj)

      expect(result).toEqual({ a: 0, b: "", c: false })
    })

    it("handles empty object", () => {
      const result = compact({})
      expect(result).toEqual({})
    })
  })

  describe("filterObject", () => {
    it("filters based on predicate", () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 }
      const result = filterObject(obj, (value) => value > 2)

      expect(result).toEqual({ c: 3, d: 4 })
    })

    it("filters based on key", () => {
      const obj = { color: "red", onClick: () => {}, padding: 4 }
      const result = filterObject(obj, (_, key) => key !== "onClick")

      expect(result).toEqual({ color: "red", padding: 4 })
    })
  })

  describe("isHtmlProp", () => {
    it("returns true for HTML props", () => {
      expect(isHtmlProp("htmlWidth")).toBe(true)
      expect(isHtmlProp("htmlHeight")).toBe(true)
      expect(isHtmlProp("htmlSize")).toBe(true)
      expect(isHtmlProp("htmlTranslate")).toBe(true)
    })

    it("returns false for non-HTML props", () => {
      expect(isHtmlProp("width")).toBe(false)
      expect(isHtmlProp("height")).toBe(false)
      expect(isHtmlProp("onClick")).toBe(false)
    })

    it("returns false for non-string values", () => {
      expect(isHtmlProp(123)).toBe(false)
      expect(isHtmlProp(null)).toBe(false)
      expect(isHtmlProp(undefined)).toBe(false)
    })
  })
})
