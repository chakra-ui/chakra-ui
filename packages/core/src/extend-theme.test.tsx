import * as React from "react"
import { extendTheme } from "./extend-theme"

describe("extendTheme", () => {
  it("should override a color", () => {
    const testColor = "papayawhip"
    const override = {
      colors: {
        blue: {
          50: testColor,
        },
      },
    }

    const customTheme = extendTheme(override)

    expect(customTheme.colors.blue[50]).toBe(testColor)
  })

  it("should override component variant with a function result", () => {
    const testColor = "papayawhip"
    const override = {
      components: {
        Button: {
          variants: {
            solid: () => ({
              bg: testColor,
            }),
          },
        },
      },
    }

    const customTheme = extendTheme(override)

    const { variants, defaultProps } = customTheme.components.Button
    const solidStyles = variants.solid(defaultProps)

    expect(solidStyles.bg).toBe(testColor)

    // should have more properties from the default theme
    expect(Object.keys(solidStyles).length).toBeGreaterThan(1)
  })

  it("should override component variant with an object", () => {
    const testColor = "papayawhip"
    const override = {
      components: {
        Button: {
          variants: {
            solid: {
              bg: testColor,
            },
          },
        },
      },
    }

    const customTheme = extendTheme(override)

    const { variants, defaultProps } = customTheme.components.Button
    const solidStyles = variants.solid(defaultProps)

    expect(solidStyles.bg).toBe(testColor)

    // should have more properties from the default theme
    expect(Object.keys(solidStyles).length).toBeGreaterThan(1)
  })
})
