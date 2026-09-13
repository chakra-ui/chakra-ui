import { createSystem, defaultConfig, defineConfig, mergeConfigs } from "../src"

describe("mergeConfig", () => {
  test("should merge config", () => {
    const sharedThemeConfig = {
      theme: {
        tokens: {
          colors: {
            brand: {
              400: { value: "black" },
            },
          },
        },
      },
    }

    const redThemeConfig = mergeConfigs(sharedThemeConfig, {
      theme: {
        tokens: {
          colors: {
            brand: {
              400: { value: "red" },
            },
          },
        },
      },
    })

    const blueThemeConfig = mergeConfigs(sharedThemeConfig, {
      theme: {
        tokens: {
          colors: {
            brand: {
              400: { value: "blue" },
            },
          },
        },
      },
    })

    expect(redThemeConfig.theme?.tokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "brand": {
            "400": {
              "value": "red",
            },
          },
        },
      }
    `)

    const redSystem = createSystem(defaultConfig, redThemeConfig)
    expect(redSystem.token("colors.brand.400")).toBe("red")

    expect(blueThemeConfig.theme?.tokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "brand": {
            "400": {
              "value": "blue",
            },
          },
        },
      }
    `)

    const blueSystem = createSystem(defaultConfig, blueThemeConfig)
    expect(blueSystem.token("colors.brand.400")).toBe("blue")
  })

  test("should handle nested token overrides", () => {
    const baseConfig = {
      theme: {
        tokens: {
          colors: {
            black: { value: "#000000" },
            white: { value: "#ffffff" },
          },
        },
      },
    }

    const customConfig = {
      theme: {
        tokens: {
          colors: {
            black: {
              100: { value: "#EE0F0F" },
              200: { value: "#CC0C0C" },
            },
            white: {
              100: { value: "#F5F5F5" },
              200: { value: "#EEEEEE" },
            },
          },
        },
      },
    }

    const mergedConfig = mergeConfigs(baseConfig, customConfig)
    const system = createSystem(mergedConfig)

    expect(system.token("colors.black")).toBe("#000000")
    expect(system.token("colors.black.100")).toBe("#EE0F0F")
    expect(system.token("colors.black.200")).toBe("#CC0C0C")

    expect(system.token("colors.white")).toBe("#ffffff")
    expect(system.token("colors.white.100")).toBe("#F5F5F5")
    expect(system.token("colors.white.200")).toBe("#EEEEEE")

    expect(mergedConfig.theme?.tokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "black": {
            "100": {
              "value": "#EE0F0F",
            },
            "200": {
              "value": "#CC0C0C",
            },
            "DEFAULT": {
              "value": "#000000",
            },
          },
          "white": {
            "100": {
              "value": "#F5F5F5",
            },
            "200": {
              "value": "#EEEEEE",
            },
            "DEFAULT": {
              "value": "#ffffff",
            },
          },
        },
      }
    `)
  })

  test("should handle nested semantic token overrides", () => {
    const baseConfig = {
      theme: {
        semanticTokens: {
          colors: {
            accent: {
              solid: { value: { base: "#2563eb", _dark: "#60a5fa" } },
              fg: { value: { base: "#1d4ed8", _dark: "#93c5fd" } },
            },
          },
        },
      },
    }

    const customConfig = {
      theme: {
        semanticTokens: {
          colors: {
            accent: { value: { base: "#ef4444", _dark: "#f87171" } },
          },
        },
      },
    }

    const mergedConfig = mergeConfigs(baseConfig, customConfig)
    const system = createSystem(mergedConfig)

    const conditionsOf = (name: string) =>
      system.tokens.getByName(name)?.extensions.conditions

    expect(conditionsOf("colors.accent.solid")).toEqual({
      base: "#2563eb",
      _dark: "#60a5fa",
    })
    expect(conditionsOf("colors.accent.fg")).toEqual({
      base: "#1d4ed8",
      _dark: "#93c5fd",
    })
    expect(conditionsOf("colors.accent")).toEqual({
      base: "#ef4444",
      _dark: "#f87171",
    })

    expect(mergedConfig.theme?.semanticTokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "accent": {
            "DEFAULT": {
              "value": {
                "_dark": "#f87171",
                "base": "#ef4444",
              },
            },
            "fg": {
              "value": {
                "_dark": "#93c5fd",
                "base": "#1d4ed8",
              },
            },
            "solid": {
              "value": {
                "_dark": "#60a5fa",
                "base": "#2563eb",
              },
            },
          },
        },
      }
    `)
  })

  test("nested semantic token override should keep the default palette", () => {
    const system = createSystem(defaultConfig, {
      theme: {
        semanticTokens: {
          colors: {
            red: { value: { _light: "tomato", _dark: "firebrick" } },
          },
        },
      },
    })

    expect(system.token("colors.red.solid")).toBe(
      "var(--chakra-colors-red-solid)",
    )
    expect(system.token("colors.red.fg")).toBe("var(--chakra-colors-red-fg)")
    expect(system.token("colors.red.subtle")).toBe(
      "var(--chakra-colors-red-subtle)",
    )
    expect(
      system.tokens.getByName("colors.red")?.extensions.conditions,
    ).toEqual({ _light: "tomato", _dark: "firebrick" })
  })

  test("should handle nested token overrides with mixed-case sibling keys", () => {
    const baseConfig = {
      theme: {
        tokens: {
          colors: {
            black: { value: "#09090B" },
            whiteAlpha: {
              100: { value: "rgba(255, 255, 255, 0.06)" },
            },
          },
        },
      },
    }

    const customConfig = defineConfig({
      theme: {
        tokens: {
          colors: {
            black: {
              100: { value: "#EE0F0F" },
            },
          },
        },
      },
    })

    const mergedConfig = mergeConfigs(baseConfig, customConfig)
    const system = createSystem(mergedConfig)

    expect(system.token("colors.black")).toBe("#09090B")
    expect(system.token("colors.black.100")).toBe("#EE0F0F")

    expect(mergedConfig.theme?.tokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "black": {
            "100": {
              "value": "#EE0F0F",
            },
            "DEFAULT": {
              "value": "#09090B",
            },
          },
          "whiteAlpha": {
            "100": {
              "value": "rgba(255, 255, 255, 0.06)",
            },
          },
        },
      }
    `)
  })

  test("override functions should be merged", () => {
    const baseConfig = defineConfig({
      utilities: {
        mt: {
          values: "spacing",
          transform(value) {
            return { marginTop: value }
          },
        },
      },
    })

    const fn = vi.fn()

    const overrideConfig = defineConfig({
      utilities: {
        mt: {
          values: "spacing",
          transform: fn,
        },
      },
    })

    const mergedConfig = mergeConfigs(baseConfig, overrideConfig)
    const utilities = mergedConfig.utilities!

    expect(utilities.mt.transform).toEqual(fn)
  })
})
