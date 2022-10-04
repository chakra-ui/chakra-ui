import defaultTheme from "@chakra-ui/theme"
import { extendTheme, mergeThemeOverride, withDefaultColorScheme } from "../src"

describe("Theme extension: withDefaultColorScheme", () => {
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
    )

    expect(theme.components.Alert.defaultProps.colorScheme).toBe("brand")
    expect(Object.keys(theme.components).length).toBeGreaterThan(1)
    expect(theme.colors.brand[500]).toBe("#b4d455")
  })

  it("should override from left to right", () => {
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
    )

    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("brand")
    expect(customTheme.components.Alert.defaultProps.size).toBe("lg")
    expect(Object.keys(customTheme.components).length).toBeGreaterThan(1)
    expect(customTheme.colors.brand[500]).toBe("#b4d455")
  })

  it("should pass on the computed value", () => {
    const customTheme = extendTheme(
      (theme) => ({ ...theme, step1: "completed" }),
      (theme) => ({ ...theme, step1: "overridden", step2: theme.step1 }),
    )

    expect(customTheme.step1).toBe("overridden")
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
      withDefaultColorScheme({
        colorScheme: "blue",
        components: ["Container"],
      }),
    )

    expect(customTheme.components.Button.defaultProps.colorScheme).toBe("red")
    expect(customTheme.components.Badge.defaultProps.colorScheme).toBe("red")
    expect(customTheme.components.Alert.defaultProps.colorScheme).toBe("blue")
    expect(customTheme.components.Table.defaultProps.colorScheme).toBe("blue")
  })

  it("should override colorScheme of custom components", () => {
    const themeWithCustomComponent = {
      components: {
        MyCustomComponent: {
          defaultProps: {
            colorScheme: "purple",
          },
        },
      },
    }

    const theme = extendTheme(
      themeWithCustomComponent,
      withDefaultColorScheme({ colorScheme: "brand" }),
    )

    expect(theme.components.MyCustomComponent.defaultProps.colorScheme).toBe(
      "brand",
    )
  })
})
