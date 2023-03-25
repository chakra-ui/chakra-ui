import { extractSemanticTokenKeys } from "../src/command/tokens/extract-semantic-token-keys"

describe("Extract Semantic Token Keys", () => {
  it("should extract semantic token keys from the given property", () => {
    const theme = {
      colors: {
        red: {
          100: "#ff0010",
          400: "#ff0040",
          500: "#ff0050",
          700: "#ff0070",
          800: "#ff0080",
        },
        green: {
          500: "#38A169",
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            default: "red.500",
            _dark: "red.400",
          },
          secondary: {
            default: "red.800",
            _dark: "red.700",
          },
          error: "red.500",
          success: "green.500",
          text: {
            red: {
              default: {
                default: "red.500",
                _dark: "red.400",
              },
              bold: {
                default: "red.800",
                _dark: "red.700",
              },
            },
            green: {
              default: "green.500",
            },
          },
        },
      },
    }
    const semanticTokenKeys = extractSemanticTokenKeys(theme, "colors")
    expect(semanticTokenKeys).toMatchInlineSnapshot(`
      Array [
        "primary",
        "secondary",
        "error",
        "success",
        "text.red.default",
        "text.red.bold",
        "text.green.default",
      ]
    `)
  })
  it("should handle empty entries", () => {
    const theme = {
      semanticTokens: {
        colors: {
          emptyColors: {},
        },
      },
    }
    const semanticTokenKeys = extractSemanticTokenKeys(theme, "colors")
    expect(semanticTokenKeys).toMatchInlineSnapshot(`Array []`)
  })
  it("should handle missing properties", () => {
    const theme = {}
    const semanticTokenKeys = extractSemanticTokenKeys(theme, "colors")
    expect(semanticTokenKeys).toMatchInlineSnapshot(`Array []`)
  })
})
