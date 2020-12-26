import * as React from "react"
import { extendTheme } from "../src/extend-theme"

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

  it("should pass typescript lint with random custom theme", () => {
    const override = {
      shadows: {
        outline: "0 0 0 3px rgb(0, 255, 0)",
      },
      colors: {
        gray: {
          "300": "red",
        },
        myCustomColor: {
          "50": "papayawhip",
        },
      },
      textStyles: {
        dl: {
          lineHeight: "tall",
          "dd + dt": {
            marginTop: "4",
          },
        },
        dt: {
          color: "gray.600",
          fontSize: "sm",
          fontWeight: "bold",
        },
        dd: {
          color: "gray.800",
        },
      },
      config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
      },
      styles: {
        global: {
          body: {
            color: "green.500",
          },
        },
      },
      components: {
        Button: {
          variants: {
            ghost: {
              fontFamily: "mono",
              _active: {
                bg: "red",
              },
            },
          },
        },
        Input: {
          baseStyle: {
            field: {
              outline: "1px solid black",
            },
          },
          variants: {
            outline: () => ({
              field: {
                bg: "green.500",
              },
            }),
            myCustomVariant: {
              field: {
                bg: "red.500",
              },
            },
          },
        },
      },
    }

    extendTheme(override)
  })

  it("should pass typescript lint with non colorhue properties", () => {
    const override = {
      colors: {
        grey: {
          100: "#e3e3e3",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          light: "#D4D4D4",
          medium: "#929292",
          dark: "#1D1D1B",
          navSubMenu: "#9F9F9F",
        },
        white: "#fff",
        black: {
          25: "rgba(0, 0, 0, 0.25)",
          50: "rgba(0, 0, 0, 0.5)",
          100: "#000",
          150: "#1D1D1B",
        },
        pink: {
          dark: "#FF8FA2",
          base: "#f6ced6",
          light: "#FAA4B3",
          lighter: "#F6CED6",
        },
      },
    }

    extendTheme(override)
  })
})
