import { extendTheme, mergeThemeOverride, ThemeOverride } from "../src"

describe("Theme Extension", () => {
  it("should be backwards compatible", () => {
    const theme = extendTheme({
      colors: {
        brand: {
          500: "#b4d455",
        },
      },
    })

    expect(Object.keys(theme.components).length).toBeGreaterThan(1)
    expect(theme.colors.brand[500]).toBe("#b4d455")
  })

  it("should allow userland extensions", () => {
    function withBrandColorExtension(colorName: string) {
      return (theme: ThemeOverride) =>
        mergeThemeOverride(theme, {
          colors: {
            brand: theme.colors![colorName],
          },
        })
    }

    const customTheme = extendTheme(withBrandColorExtension("red"))

    expect(customTheme.colors.brand).toHaveProperty("500")
  })

  it("should use a custom base theme", () => {
    const customBaseTheme = {
      borders: {},
      breakpoints: {
        base: "0em" as const,
      },
      colors: {},
      components: {},
      config: {},
      direction: "ltr" as const,
      fonts: {},
      fontSizes: {},
      fontWeights: {},
      letterSpacings: {},
      lineHeights: {},
      radii: {},
      shadows: {},
      sizes: {},
      space: {},
      styles: {},
      transition: {
        duration: {},
        easing: {},
        property: {},
      },
      zIndices: {},
    }

    const customTheme = extendTheme(
      {
        colors: {
          brand: {
            500: "#b4d455",
          },
        },
      },
      customBaseTheme,
    )

    expect(customTheme.colors.brand).toHaveProperty("500")
    expect(Object.keys(customTheme.components)).toHaveLength(0)
  })
})
