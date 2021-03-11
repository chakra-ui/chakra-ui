import defaultTheme from "@chakra-ui/theme"
import { extendTheme, mergeThemeOverride, ThemeOverride } from "../src"

describe("Theme Extension", () => {
  it("should be backwards compatible", () => {
    const theme = extendTheme(
      {
        colors: {
          brand: {
            500: "#b4d455",
          },
        },
      },
      defaultTheme,
    )

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

    const customTheme = extendTheme(
      withBrandColorExtension("red"),
      defaultTheme,
    )

    expect(customTheme.colors.brand).toHaveProperty("500")
  })
})
