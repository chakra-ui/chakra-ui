import { extendTheme, ThemeOverride } from "../src/extend-theme"
import { createBreakpoints } from "@chakra-ui/theme-tools"

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

  it("should merge component baseStyle object with a function result", () => {
    const testColor = "papayawhip"
    const override = {
      components: {
        Button: {
          baseStyle: () => ({
            bg: testColor,
          }),
        },
      },
    }

    const customTheme = extendTheme(override)

    const { baseStyle, defaultProps } = customTheme.components.Button
    const baseStyles = baseStyle()

    expect(baseStyles.bg).toBe(testColor)

    // should have more properties from the default theme
    expect(Object.keys(baseStyles).length).toBeGreaterThan(1)
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

  it("should be able to extend a multipart component", () => {
    const override: ThemeOverride = {
      components: {
        Textarea: {
          defaultProps: {
            focusBorderColor: "green.200",
          },
        },
      },
    }

    extendTheme(override)
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
        initialColorMode: "dark" as const,
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
    const override: ThemeOverride = {
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
          special: {
            nestedColor: "#111",
            verySpecial: {
              50: "#fff",
              deepNestedColor: "#111",
            },
          },
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

  it("should not extend with function that is inherited", () => {
    Array.prototype["customFunction"] = () => {}

    const override = {
      breakpoints: createBreakpoints({
        sm: "1",
        md: "1",
        lg: "1",
        xl: "1",
      }),
    }

    const customTheme = extendTheme(override)

    delete Array.prototype["customFunction"]

    expect((customTheme.breakpoints as any).customFunction).toBeUndefined()
  })

  it("should allow custom breakpoints", () => {
    const override = {
      breakpoints: createBreakpoints({
        sm: "1px",
        md: "2px",
        lg: "3px",
        xl: "4px",
        phone: "5px",
      }),
    }

    const customTheme = extendTheme(override)

    expect(customTheme.breakpoints).toHaveProperty("sm")
    expect(customTheme.breakpoints).toHaveProperty("md")
    expect(customTheme.breakpoints).toHaveProperty("lg")
    expect(customTheme.breakpoints).toHaveProperty("xl")
    expect(customTheme.breakpoints).toHaveProperty("phone")
  })
})
