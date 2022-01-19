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
  textStyles: {
    small: {
      fontSize: 16,
    },
    large: {
      fontSize: 64,
      fontWeight: "bold",
    },
  },
  layerStyles: {
    red: {
      background: "#ff0000",
    },
    blue: {
      background: "#0000ff",
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
    const themeInterface = await createThemeTypingsInterface(smallTheme, {
      config: themeKeyConfiguration,
    })

    expect(themeInterface).toMatchInlineSnapshot(`
      "// regenerate by running
      // npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
      export interface ThemeTypings {
        blur: string & {}
        borders: \\"sm\\" | \\"md\\" | (string & {})
        borderStyles: string & {}
        borderWidths: string & {}
        breakpoints: \\"sm\\" | \\"md\\" | (string & {})
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
          | (string & {})
        colorSchemes: \\"onlyColorSchemeColor\\" | (string & {})
        fonts: \\"sm\\" | \\"md\\" | (string & {})
        fontSizes: \\"sm\\" | \\"md\\" | (string & {})
        fontWeights: \\"sm\\" | \\"md\\" | (string & {})
        layerStyles: \\"red\\" | \\"blue\\" | (string & {})
        letterSpacings: \\"sm\\" | \\"md\\" | (string & {})
        lineHeights: \\"sm\\" | \\"md\\" | (string & {})
        radii: \\"sm\\" | \\"md\\" | (string & {})
        shadows: \\"sm\\" | \\"md\\" | (string & {})
        sizes: \\"sm\\" | \\"md\\" | (string & {})
        space: \\"sm\\" | \\"-sm\\" | \\"md\\" | \\"-md\\" | (string & {})
        textStyles: \\"small\\" | \\"large\\" | (string & {})
        transition: \\"sm\\" | \\"md\\" | (string & {})
        zIndices: \\"sm\\" | \\"md\\" | (string & {})
        components: {
          Button: {
            sizes: \\"sm\\" | (string & {})
            variants: \\"extraordinary\\" | \\"awesome\\" | \\"unused\\" | (string & {})
          }
        }
      }
      "
    `)
  })

  it("should emit empty scales as loose type", async () => {
    const themeInterface = await createThemeTypingsInterface(
      {},
      {
        config: themeKeyConfiguration,
      },
    )

    expect(themeInterface).toMatchInlineSnapshot(`
      "// regenerate by running
      // npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
      export interface ThemeTypings {
        blur: string & {}
        borders: string & {}
        borderStyles: string & {}
        borderWidths: string & {}
        breakpoints: string & {}
        colors: string & {}
        colorSchemes: string & {}
        fonts: string & {}
        fontSizes: string & {}
        fontWeights: string & {}
        layerStyles: string & {}
        letterSpacings: string & {}
        lineHeights: string & {}
        radii: string & {}
        shadows: string & {}
        sizes: string & {}
        space: string & {}
        textStyles: string & {}
        transition: string & {}
        zIndices: string & {}
        components: {}
      }
      "
    `)
  })

  it("should emit strict component types", async () => {
    const themeInterface = await createThemeTypingsInterface(smallTheme, {
      config: themeKeyConfiguration,
      strictComponentTypes: true,
    })

    expect(themeInterface).toMatchInlineSnapshot(`
      "// regenerate by running
      // npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
      export interface ThemeTypings {
        blur: string & {}
        borders: \\"sm\\" | \\"md\\" | (string & {})
        borderStyles: string & {}
        borderWidths: string & {}
        breakpoints: \\"sm\\" | \\"md\\" | (string & {})
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
          | (string & {})
        colorSchemes: \\"onlyColorSchemeColor\\" | (string & {})
        fonts: \\"sm\\" | \\"md\\" | (string & {})
        fontSizes: \\"sm\\" | \\"md\\" | (string & {})
        fontWeights: \\"sm\\" | \\"md\\" | (string & {})
        layerStyles: \\"red\\" | \\"blue\\" | (string & {})
        letterSpacings: \\"sm\\" | \\"md\\" | (string & {})
        lineHeights: \\"sm\\" | \\"md\\" | (string & {})
        radii: \\"sm\\" | \\"md\\" | (string & {})
        shadows: \\"sm\\" | \\"md\\" | (string & {})
        sizes: \\"sm\\" | \\"md\\" | (string & {})
        space: \\"sm\\" | \\"-sm\\" | \\"md\\" | \\"-md\\" | (string & {})
        textStyles: \\"small\\" | \\"large\\" | (string & {})
        transition: \\"sm\\" | \\"md\\" | (string & {})
        zIndices: \\"sm\\" | \\"md\\" | (string & {})
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
})
