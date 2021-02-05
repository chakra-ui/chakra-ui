import { createThemeTypingsInterface } from "../src/command/tokens/create-theme-typings-interface"
import { themeKeyConfiguration } from "../src/command/tokens/config"

const defaultRecord = {
  sm: "",
  md: "",
}

const smallTheme: Record<string, unknown> = {
  colors: {
    niceColor: "",
    suchWowColor: "",
    onlyColorSchemeColor: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      600: "",
      700: "",
      800: "",
      900: "",
    },
    such: {
      deep: {
        color: "",
      },
    },
  },
  components: {
    Button: {
      variants: {
        extraordinary: {},
        awesome: {},
        unused: {},
      },
      sizes: {
        sm: "",
      },
    },
  },
  letterSpacings: defaultRecord,
  lineHeights: defaultRecord,
  fontWeights: defaultRecord,
  fonts: defaultRecord,
  fontSizes: defaultRecord,
  breakpoints: defaultRecord,
  zIndices: defaultRecord,
  radii: defaultRecord,
  sizes: defaultRecord,
  shadows: defaultRecord,
  space: defaultRecord,
  borders: defaultRecord,
  transition: defaultRecord,
  styles: {},
  config: {},
}

describe("Theme typings", () => {
  it("should create typings for a theme", async () => {
    const themeUnderTest = smallTheme

    const themeInterface = await createThemeTypingsInterface(themeUnderTest, {
      config: themeKeyConfiguration,
    })

    expect(themeInterface).toMatchInlineSnapshot(`
      "// regenerate by running
      // npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
      export interface ThemeTypings {
        borders: \\"sm\\" | \\"md\\"
        breakpoints: \\"sm\\" | \\"md\\"
        colors:
          | \\"niceColor\\"
          | \\"suchWowColor\\"
          | \\"onlyColorSchemeColor.50\\"
          | \\"onlyColorSchemeColor.100\\"
          | \\"onlyColorSchemeColor.200\\"
          | \\"onlyColorSchemeColor.300\\"
          | \\"onlyColorSchemeColor.400\\"
          | \\"onlyColorSchemeColor.500\\"
          | \\"onlyColorSchemeColor.600\\"
          | \\"onlyColorSchemeColor.700\\"
          | \\"onlyColorSchemeColor.800\\"
          | \\"onlyColorSchemeColor.900\\"
          | \\"such.deep.color\\"
        fonts: \\"sm\\" | \\"md\\"
        fontSizes: \\"sm\\" | \\"md\\"
        fontWeights: \\"sm\\" | \\"md\\"
        letterSpacings: \\"sm\\" | \\"md\\"
        lineHeights: \\"sm\\" | \\"md\\"
        radii: \\"sm\\" | \\"md\\"
        shadows: \\"sm\\" | \\"md\\"
        sizes: \\"sm\\" | \\"md\\"
        space: \\"sm\\" | \\"-sm\\" | \\"md\\" | \\"-md\\"
        textStyles: never
        transition: \\"sm\\" | \\"md\\"
        zIndices: \\"sm\\" | \\"md\\"
        colorSchemes: \\"onlyColorSchemeColor\\"
        components: {
          Button: {
            sizes: \\"sm\\"
            variants: \\"extraordinary\\" | \\"awesome\\" | \\"unused\\"
          }
        }
      }
      "
    `)
  })

  it("should not omit empty unions", async () => {
    const themeUnderTest = {}

    const themeInterface = await createThemeTypingsInterface(themeUnderTest, {
      config: themeKeyConfiguration,
    })

    expect(themeInterface).toMatchInlineSnapshot(`
      "// regenerate by running
      // npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
      export interface ThemeTypings {
        borders: never
        breakpoints: never
        colors: never
        fonts: never
        fontSizes: never
        fontWeights: never
        letterSpacings: never
        lineHeights: never
        radii: never
        shadows: never
        sizes: never
        space: never
        textStyles: never
        transition: never
        zIndices: never
        colorSchemes: never
        components: {}
      }
      "
    `)
  })
})
