import { describe, expect, it } from "vitest"
import {
  get,
  getStyleConfigDefaultProps,
  isSlotStyleConfig,
  mergeStyleConfigs,
  resolveComponentStyleConfig,
  resolveSlotStyleConfig,
  resolveStyleConfig,
} from "../src/resolve-style-config"
import type { SlotStyleConfig, StyleConfig } from "../src/types"

describe("resolve-style-config", () => {
  describe("get", () => {
    it("gets nested value with dot notation", () => {
      const obj = { a: { b: { c: "value" } } }
      expect(get(obj, "a.b.c")).toBe("value")
    })

    it("returns fallback for missing path", () => {
      const obj = { a: { b: {} } }
      expect(get(obj, "a.b.c", "fallback")).toBe("fallback")
    })

    it("returns fallback for null in path", () => {
      const obj = { a: null }
      expect(get(obj, "a.b.c", "fallback")).toBe("fallback")
    })

    it("returns undefined when no fallback and path missing", () => {
      const obj = { a: {} }
      expect(get(obj, "a.b.c")).toBeUndefined()
    })
  })

  describe("resolveStyleConfig", () => {
    it("resolves base style", () => {
      const config: StyleConfig = {
        baseStyle: { display: "flex", padding: "8px" },
      }

      const result = resolveStyleConfig(config, {})

      expect(result).toEqual({
        display: "flex",
        padding: "8px",
      })
    })

    it("resolves base style function", () => {
      const config: StyleConfig = {
        baseStyle: (props) => ({
          color: props.colorPalette === "blue" ? "blue.500" : "gray.500",
        }),
      }

      const result = resolveStyleConfig(config, { colorPalette: "blue" })

      expect(result).toEqual({ color: "blue.500" })
    })

    it("resolves variant styles", () => {
      const config: StyleConfig = {
        baseStyle: { display: "flex" },
        variants: {
          solid: { background: "blue.500" },
          outline: { border: "1px solid" },
        },
      }

      const result = resolveStyleConfig(config, { variant: "solid" })

      expect(result).toEqual({
        display: "flex",
        background: "blue.500",
      })
    })

    it("resolves size styles", () => {
      const config: StyleConfig = {
        baseStyle: { display: "flex" },
        sizes: {
          sm: { padding: "4px" },
          md: { padding: "8px" },
          lg: { padding: "16px" },
        },
      }

      const result = resolveStyleConfig(config, { size: "md" })

      expect(result).toEqual({
        display: "flex",
        padding: "8px",
      })
    })

    it("uses default props when not provided", () => {
      const config: StyleConfig = {
        variants: {
          solid: { background: "blue.500" },
        },
        defaultProps: { variant: "solid" },
      }

      const result = resolveStyleConfig(config, {})

      expect(result).toEqual({ background: "blue.500" })
    })

    it("provided props override default props", () => {
      const config: StyleConfig = {
        variants: {
          solid: { background: "blue.500" },
          outline: { border: "1px solid" },
        },
        defaultProps: { variant: "solid" },
      }

      const result = resolveStyleConfig(config, { variant: "outline" })

      expect(result).toEqual({ border: "1px solid" })
    })

    it("merges in correct order: base < size < variant", () => {
      const config: StyleConfig = {
        baseStyle: { padding: "4px", margin: "0" },
        sizes: {
          md: { padding: "8px", fontSize: "14px" },
        },
        variants: {
          solid: { padding: "16px", background: "blue.500" },
        },
      }

      const result = resolveStyleConfig(config, {
        variant: "solid",
        size: "md",
      })

      // variant padding should override size padding
      expect(result).toEqual({
        margin: "0",
        fontSize: "14px",
        padding: "16px",
        background: "blue.500",
      })
    })
  })

  describe("resolveSlotStyleConfig", () => {
    it("resolves styles for each slot", () => {
      const config: SlotStyleConfig = {
        baseStyle: {
          root: { display: "flex" },
          trigger: { cursor: "pointer" },
          content: { padding: "8px" },
        },
      }

      const result = resolveSlotStyleConfig(config, {})

      expect(result).toEqual({
        root: { display: "flex" },
        trigger: { cursor: "pointer" },
        content: { padding: "8px" },
      })
    })

    it("resolves variant styles for slots", () => {
      const config: SlotStyleConfig = {
        baseStyle: {
          root: { display: "flex" },
          content: { padding: "8px" },
        },
        variants: {
          outline: {
            root: { border: "1px solid" },
            content: { background: "transparent" },
          },
        },
      }

      const result = resolveSlotStyleConfig(config, { variant: "outline" })

      expect(result).toEqual({
        root: { display: "flex", border: "1px solid" },
        content: { padding: "8px", background: "transparent" },
      })
    })

    it("resolves size styles for slots", () => {
      const config: SlotStyleConfig = {
        baseStyle: {
          root: { display: "flex" },
          content: { padding: "8px" },
        },
        sizes: {
          lg: {
            root: { minHeight: "48px" },
            content: { padding: "16px" },
          },
        },
      }

      const result = resolveSlotStyleConfig(config, { size: "lg" })

      expect(result).toEqual({
        root: { display: "flex", minHeight: "48px" },
        content: { padding: "16px" },
      })
    })
  })

  describe("resolveComponentStyleConfig", () => {
    it("looks up style config from theme", () => {
      const theme = {
        components: {
          Button: {
            baseStyle: { display: "inline-flex" },
            variants: {
              solid: { background: "blue.500" },
            },
          },
        },
      }

      const result = resolveComponentStyleConfig({
        themeKey: "Button",
        theme,
        colorMode: "light",
        props: { variant: "solid" },
      })

      expect(result).toEqual({
        display: "inline-flex",
        background: "blue.500",
      })
    })

    it("uses provided styleConfig over theme", () => {
      const theme = {
        components: {
          Button: {
            baseStyle: { display: "inline-flex" },
          },
        },
      }

      const customConfig: StyleConfig = {
        baseStyle: { display: "block" },
      }

      const result = resolveComponentStyleConfig({
        themeKey: "Button",
        theme,
        colorMode: "light",
        props: {},
        styleConfig: customConfig,
      })

      expect(result).toEqual({ display: "block" })
    })

    it("returns empty object when no style config found", () => {
      const result = resolveComponentStyleConfig({
        themeKey: "NonExistent",
        theme: {},
        colorMode: "light",
        props: {},
      })

      expect(result).toEqual({})
    })

    it("handles null themeKey", () => {
      const result = resolveComponentStyleConfig({
        themeKey: null,
        theme: { components: {} },
        colorMode: "light",
        props: {},
      })

      expect(result).toEqual({})
    })

    it("passes colorMode to style functions", () => {
      const theme = {
        components: {
          Button: {
            baseStyle: (props: any) => ({
              color: props.colorMode === "dark" ? "white" : "black",
            }),
          },
        },
      }

      const lightResult = resolveComponentStyleConfig({
        themeKey: "Button",
        theme,
        colorMode: "light",
        props: {},
      })

      const darkResult = resolveComponentStyleConfig({
        themeKey: "Button",
        theme,
        colorMode: "dark",
        props: {},
      })

      expect(lightResult).toEqual({ color: "black" })
      expect(darkResult).toEqual({ color: "white" })
    })
  })

  describe("isSlotStyleConfig", () => {
    it("returns false for single-part config with object baseStyle", () => {
      const config: StyleConfig = {
        baseStyle: { display: "flex", padding: "8px" },
      }

      expect(isSlotStyleConfig(config)).toBe(false)
    })

    it("returns false for single-part config with function baseStyle", () => {
      const config: StyleConfig = {
        baseStyle: () => ({ display: "flex" }),
      }

      expect(isSlotStyleConfig(config)).toBe(false)
    })

    it("returns true for slot config with function slot styles", () => {
      const config: SlotStyleConfig = {
        baseStyle: {
          root: () => ({ display: "flex" }),
          content: () => ({ padding: "8px" }),
        },
      }

      expect(isSlotStyleConfig(config)).toBe(true)
    })

    it("returns true for slot config with object slot styles containing CSS properties", () => {
      const config: SlotStyleConfig = {
        baseStyle: {
          root: { display: "flex", padding: "8px" },
          content: { color: "red" },
        },
      }

      expect(isSlotStyleConfig(config)).toBe(true)
    })

    it("returns false for empty baseStyle", () => {
      const config = { baseStyle: {} }
      expect(isSlotStyleConfig(config as StyleConfig)).toBe(false)
    })

    it("returns false for missing baseStyle", () => {
      const config = { variants: {} }
      expect(isSlotStyleConfig(config as StyleConfig)).toBe(false)
    })
  })

  describe("getStyleConfigDefaultProps", () => {
    it("returns default props from style config", () => {
      const config: StyleConfig = {
        defaultProps: { variant: "solid", size: "md" },
      }

      expect(getStyleConfigDefaultProps(config)).toEqual({
        variant: "solid",
        size: "md",
      })
    })

    it("returns empty object when no default props", () => {
      const config: StyleConfig = { baseStyle: {} }

      expect(getStyleConfigDefaultProps(config)).toEqual({})
    })

    it("returns empty object for undefined config", () => {
      expect(getStyleConfigDefaultProps(undefined)).toEqual({})
    })
  })

  describe("mergeStyleConfigs", () => {
    it("merges base styles", () => {
      const config1: StyleConfig = {
        baseStyle: { display: "flex" },
      }
      const config2: StyleConfig = {
        baseStyle: { alignItems: "center" },
      }

      const result = mergeStyleConfigs(config1, config2)

      // Later baseStyle replaces earlier (not deep merged)
      expect(result.baseStyle).toEqual({ alignItems: "center" })
    })

    it("merges variants", () => {
      const config1: StyleConfig = {
        variants: { solid: { background: "blue" } },
      }
      const config2: StyleConfig = {
        variants: { outline: { border: "1px solid" } },
      }

      const result = mergeStyleConfigs(config1, config2)

      expect(result.variants).toEqual({
        solid: { background: "blue" },
        outline: { border: "1px solid" },
      })
    })

    it("merges sizes", () => {
      const config1: StyleConfig = {
        sizes: { sm: { padding: "4px" } },
      }
      const config2: StyleConfig = {
        sizes: { md: { padding: "8px" } },
      }

      const result = mergeStyleConfigs(config1, config2)

      expect(result.sizes).toEqual({
        sm: { padding: "4px" },
        md: { padding: "8px" },
      })
    })

    it("merges default props", () => {
      const config1: StyleConfig = {
        defaultProps: { variant: "solid" },
      }
      const config2: StyleConfig = {
        defaultProps: { size: "md" },
      }

      const result = mergeStyleConfigs(config1, config2)

      expect(result.defaultProps).toEqual({
        variant: "solid",
        size: "md",
      })
    })

    it("handles undefined configs", () => {
      const config: StyleConfig = {
        baseStyle: { display: "flex" },
      }

      const result = mergeStyleConfigs(undefined, config, undefined)

      expect(result.baseStyle).toEqual({ display: "flex" })
    })
  })
})
