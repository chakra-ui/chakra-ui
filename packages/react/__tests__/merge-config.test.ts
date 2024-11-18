import { createSystem, defaultConfig, mergeConfigs } from "../src"

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
})
