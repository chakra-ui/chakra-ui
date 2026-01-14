import { describe, expect, it, vi } from "vitest"
import {
  createShouldForwardProp,
  createSimpleRecipe,
  deepMergeStyles,
  mergeStyles,
  resolveProps,
  runIfFn,
} from "../src/resolve-props"
import type { Dict, RecipeFn } from "../src/types"

describe("resolve-props", () => {
  describe("resolveProps", () => {
    // Create a mock recipe for testing
    function createMockRecipe(
      baseStyles: Record<string, any> = {},
      recipeVariantKeys: string[] = ["variant", "size"],
    ) {
      const fn = (props: Dict = {}) => ({
        ...baseStyles,
        ...(props.variant === "solid" ? { background: "blue.500" } : {}),
        ...(props.size === "md" ? { padding: "8px" } : {}),
      })

      fn.variantKeys = recipeVariantKeys
      fn.variantMap = {
        variant: ["solid", "outline"],
        size: ["sm", "md", "lg"],
      }
      fn.splitVariantProps = vi.fn() as any

      return fn as RecipeFn
    }

    const mockCss = (...styles: any[]) => {
      return Object.assign({}, ...styles.filter(Boolean))
    }

    const stylePropsSet = new Set([
      "color",
      "padding",
      "margin",
      "background",
      "css",
      "display",
    ])

    const mockIsValidProperty = (key: string) => {
      return stylePropsSet.has(key)
    }

    // shouldForwardProp should return true for props that should go directly to the element
    // and false for props that should stay in the prop resolution pipeline
    // In a real implementation, style props should NOT be forwarded
    const defaultShouldForward = (key: string, variantKeys: string[]) => {
      // Don't forward variant keys (they're consumed by recipe)
      if (variantKeys.includes(key)) return false
      // Don't forward style props (they're consumed by style system)
      if (stylePropsSet.has(key)) return false
      // Forward everything else (event handlers, data attributes, etc.)
      return true
    }

    it("splits props correctly", () => {
      const recipe = createMockRecipe({ display: "flex" })
      const result = resolveProps({
        props: {
          variant: "solid",
          size: "md",
          color: "red",
          onClick: () => {},
          children: "Click me",
        },
        recipe,
        shouldForwardProp: defaultShouldForward,
        css: mockCss,
        isValidProperty: mockIsValidProperty,
      })

      // Styles should include recipe styles (from variant/size) and style props
      expect(result.styles).toEqual({
        display: "flex",
        background: "blue.500",
        padding: "8px",
        color: "red",
      })

      // Props should include forwarded props and element props
      expect(result.props).toEqual({
        onClick: expect.any(Function),
        children: "Click me",
      })
    })

    it("handles css prop array", () => {
      const recipe = createMockRecipe({ display: "flex" })
      const result = resolveProps({
        props: {
          variant: "solid",
          css: [{ margin: "10px" }, { padding: "20px" }],
        },
        recipe,
        shouldForwardProp: defaultShouldForward,
        css: mockCss,
        isValidProperty: mockIsValidProperty,
      })

      expect(result.styles).toEqual({
        display: "flex",
        background: "blue.500",
        margin: "10px",
        padding: "20px",
      })
    })

    it("handles colorPalette when not in variantKeys", () => {
      // Create a recipe that uses colorPalette in its output
      const recipeWithColorPalette = (() => {
        const fn = (props: Dict = {}) => ({
          background: props.colorPalette
            ? `${props.colorPalette}.500`
            : "gray.500",
        })

        fn.variantKeys = ["variant", "size"]
        fn.variantMap = { variant: [], size: [] }
        fn.splitVariantProps = vi.fn() as any

        return fn as RecipeFn
      })()

      const result = resolveProps({
        props: {
          variant: "solid",
          colorPalette: "blue",
        },
        recipe: recipeWithColorPalette,
        shouldForwardProp: defaultShouldForward,
        css: mockCss,
        isValidProperty: mockIsValidProperty,
      })

      // Verify colorPalette was passed to recipe by checking output
      expect(result.styles).toEqual({
        background: "blue.500",
      })
    })

    it("handles orientation when not in variantKeys", () => {
      // Create a recipe that uses orientation in its output
      const recipeWithOrientation = (() => {
        const fn = (props: Dict = {}) => ({
          flexDirection: props.orientation === "horizontal" ? "row" : "column",
        })

        fn.variantKeys = ["variant", "size"]
        fn.variantMap = { variant: [], size: [] }
        fn.splitVariantProps = vi.fn() as any

        return fn as RecipeFn
      })()

      const result = resolveProps({
        props: {
          variant: "solid",
          orientation: "horizontal",
        },
        recipe: recipeWithOrientation,
        shouldForwardProp: defaultShouldForward,
        css: mockCss,
        isValidProperty: mockIsValidProperty,
      })

      // Verify orientation was passed to recipe by checking output
      expect(result.styles).toEqual({
        flexDirection: "row",
      })
    })

    it("handles empty props", () => {
      const recipe = createMockRecipe({ display: "flex" })
      const result = resolveProps({
        props: {},
        recipe,
        shouldForwardProp: defaultShouldForward,
        css: mockCss,
        isValidProperty: mockIsValidProperty,
      })

      expect(result.styles).toEqual({ display: "flex" })
      expect(result.props).toEqual({})
    })
  })

  describe("createShouldForwardProp", () => {
    it("forwards non-variant props by default", () => {
      const shouldForward = createShouldForwardProp()

      expect(shouldForward("onClick", ["variant", "size"])).toBe(true)
      expect(shouldForward("disabled", ["variant", "size"])).toBe(true)
    })

    it("does not forward variant keys", () => {
      const shouldForward = createShouldForwardProp()

      expect(shouldForward("variant", ["variant", "size"])).toBe(false)
      expect(shouldForward("size", ["variant", "size"])).toBe(false)
    })

    it("always forwards additional forwarded props", () => {
      const shouldForward = createShouldForwardProp(["variant"])

      // variant is explicitly forwarded even though it's in variantKeys
      expect(shouldForward("variant", ["variant", "size"])).toBe(true)
      expect(shouldForward("size", ["variant", "size"])).toBe(false)
    })
  })

  describe("mergeStyles", () => {
    it("merges multiple style objects", () => {
      const result = mergeStyles(
        { color: "red", padding: 4 },
        { color: "blue", margin: 8 },
      )

      expect(result).toEqual({
        color: "blue",
        padding: 4,
        margin: 8,
      })
    })

    it("handles undefined values", () => {
      const result = mergeStyles({ color: "red" }, undefined, { margin: 8 })

      expect(result).toEqual({
        color: "red",
        margin: 8,
      })
    })

    it("handles empty objects", () => {
      const result = mergeStyles({}, { color: "red" }, {})

      expect(result).toEqual({ color: "red" })
    })
  })

  describe("deepMergeStyles", () => {
    it("deep merges nested objects", () => {
      const result = deepMergeStyles(
        { color: "red", _hover: { color: "blue" } },
        { _hover: { background: "gray" } },
      )

      expect(result).toEqual({
        color: "red",
        _hover: { color: "blue", background: "gray" },
      })
    })

    it("overwrites non-object values", () => {
      const result = deepMergeStyles({ color: "red" }, { color: "blue" })

      expect(result).toEqual({ color: "blue" })
    })

    it("handles arrays (replaces, does not merge)", () => {
      const result = deepMergeStyles({ items: [1, 2] }, { items: [3, 4] })

      expect(result).toEqual({ items: [3, 4] })
    })
  })

  describe("runIfFn", () => {
    it("calls function with args if value is function", () => {
      const fn = (a: number, b: number) => a + b
      const result = runIfFn(fn, 2, 3)

      expect(result).toBe(5)
    })

    it("returns value as-is if not a function", () => {
      const result = runIfFn({ color: "red" })

      expect(result).toEqual({ color: "red" })
    })

    it("handles null value", () => {
      const result = runIfFn(null)
      expect(result).toBeNull()
    })

    it("handles undefined value", () => {
      const result = runIfFn(undefined)
      expect(result).toBeUndefined()
    })
  })

  describe("createSimpleRecipe", () => {
    it("creates a recipe with base styles", () => {
      const recipe = createSimpleRecipe({
        base: { display: "inline-flex", alignItems: "center" },
      })

      const styles = recipe()

      expect(styles).toEqual({
        display: "inline-flex",
        alignItems: "center",
      })
    })

    it("applies variant styles", () => {
      const recipe = createSimpleRecipe({
        base: { display: "inline-flex" },
        variants: {
          variant: {
            solid: { background: "blue.500", color: "white" },
            outline: { border: "1px solid", background: "transparent" },
          },
        },
      })

      const solidStyles = recipe({ variant: "solid" })
      const outlineStyles = recipe({ variant: "outline" })

      expect(solidStyles).toEqual({
        display: "inline-flex",
        background: "blue.500",
        color: "white",
      })

      expect(outlineStyles).toEqual({
        display: "inline-flex",
        border: "1px solid",
        background: "transparent",
      })
    })

    it("applies default variants", () => {
      const recipe = createSimpleRecipe({
        base: { display: "inline-flex" },
        variants: {
          size: {
            sm: { padding: "4px" },
            md: { padding: "8px" },
          },
        },
        defaultVariants: { size: "md" },
      })

      const styles = recipe()

      expect(styles).toEqual({
        display: "inline-flex",
        padding: "8px",
      })
    })

    it("has correct variantKeys and variantMap", () => {
      const recipe = createSimpleRecipe({
        variants: {
          size: { sm: {}, md: {}, lg: {} },
          variant: { solid: {}, outline: {} },
        },
      })

      expect(recipe.variantKeys).toEqual(["size", "variant"])
      expect(recipe.variantMap).toEqual({
        size: ["sm", "md", "lg"],
        variant: ["solid", "outline"],
      })
    })

    it("splitVariantProps separates variant props", () => {
      const recipe = createSimpleRecipe({
        variants: {
          size: { sm: {}, md: {} },
        },
      })

      const [variantProps, rest] = recipe.splitVariantProps({
        size: "md",
        onClick: () => {},
        disabled: true,
      })

      expect(variantProps).toEqual({ size: "md" })
      expect(rest).toEqual({ onClick: expect.any(Function), disabled: true })
    })
  })
})
