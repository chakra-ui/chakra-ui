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
