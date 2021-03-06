import defaultTheme from "@chakra-ui/theme"
import {
  extendTheme,
  mergeThemeOverride,
  ThemeExtension,
  withDefaultColorScheme,
} from "../src"

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

  it("should compose all extensions", () => {
    const theme = extendTheme(
      {
        colors: {
          brand: {
            500: "#b4d455",
          },
        },
      },
      withDefaultColorScheme({ colorScheme: "brand" }),
      defaultTheme,
    )

    expect(theme.components.Alert.defaultProps.colorScheme).toBe("brand")
    expect(Object.keys(theme.components).length).toBeGreaterThan(1)
    expect(theme.colors.brand[500]).toBe("#b4d455")
  })

  it("should override from right to left", () => {
    const customTheme = extendTheme(
      withDefaultColorScheme({ colorScheme: "banana" }),
      withDefaultColorScheme({ colorScheme: "brand" }),
      {
        colors: {
          brand: {
            500: "papayawhip",
          },
        },
      },
      {
        colors: {
          brand: {
            500: "#b4d455",
          },
        },
        components: {
          Alert: {
            defaultProps: {
              size: "lg",
            },
          },
        },
      },
      defaultTheme,
    )

    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("brand")
    expect(customTheme.components.Alert.defaultProps.size).toBe("lg")
    expect(Object.keys(customTheme.components).length).toBeGreaterThan(1)
    expect(customTheme.colors.brand[500]).toBe("#b4d455")
  })

  it("should pass on the computed value", () => {
    const customTheme = extendTheme(
      (theme) => ({ ...theme, step1: "completed" }),
      (theme) => ({ ...theme, step1: "overriden", step2: theme.step1 }),
      defaultTheme,
    )

    expect(customTheme.step1).toBe("overriden")
    expect(customTheme.step2).toBe("completed")
  })

  it("should allow overrides of default color scheme with extension", () => {
    const customTheme = extendTheme(
      withDefaultColorScheme({ colorScheme: "brand" }),
      (theme: typeof defaultTheme) =>
        mergeThemeOverride(theme, {
          colors: {
            brand: theme.colors.red,
          },
          components: {
            Alert: {
              defaultProps: {
                colorScheme: "blue",
              },
            },
          },
        }),
      defaultTheme,
    )

    expect(customTheme.colors.brand).toHaveProperty("500")
    expect(customTheme.components.Badge.defaultProps.colorScheme).toBe("brand")
    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("blue")
  })

  it("should allow overrides of default color scheme with override", () => {
    const customTheme = extendTheme(
      withDefaultColorScheme({ colorScheme: "brand" }),
      {
        colors: {
          brand: defaultTheme.colors.red,
        },
        components: {
          Alert: {
            defaultProps: {
              colorScheme: "blue",
            },
          },
        },
      },
      defaultTheme,
    )

    expect(customTheme.colors.brand).toHaveProperty("500")
    expect(customTheme.components.Badge.defaultProps.colorScheme).toBe("brand")
    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("blue")
  })

  it("should allow overrides only mentioned components", () => {
    const customTheme = extendTheme(
      withDefaultColorScheme({
        colorScheme: "red",
        components: ["Button", "Badge"],
      }),
      withDefaultColorScheme({
        colorScheme: "blue",
        components: ["Alert", "Table"],
      }),
      defaultTheme,
    )

    expect(customTheme.components.Button.defaultProps.colorScheme).toBe("red")
    expect(customTheme.components.Badge.defaultProps.colorScheme).toBe("red")
    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("blue")
    expect(customTheme.components.Table.defaultProps.colorScheme).toBe("blue")
  })

  it("should allow userland extensions", () => {
    function withBrandColorExtension(colorName: string): ThemeExtension {
      return (theme) =>
        mergeThemeOverride(theme, {
          colors: {
            brand: theme.colors![colorName],
          },
        })
    }

    const customTheme = extendTheme(
      withBrandColorExtension("red"),
      withDefaultColorScheme({ colorScheme: "brand" }),
      defaultTheme,
    )

    expect(customTheme.colors.brand).toHaveProperty("500")
    expect(customTheme.components.Button.defaultProps.colorScheme).toBe("brand")
    expect(customTheme.components.Badge.defaultProps.colorScheme).toBe("brand")
  })
})
