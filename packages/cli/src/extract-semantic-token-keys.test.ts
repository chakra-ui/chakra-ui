import { extractSemanticTokenKeys } from "./extract-semantic-token-keys.js"

describe("Extract Semantic Token Keys", () => {
  it("should extract semantic token keys from the given property", () => {
    const theme = {
      colors: {
        green: {
          500: "#38A169",
        },
        red: {
          100: "#ff0010",
          400: "#ff0040",
          500: "#ff0050",
          700: "#ff0070",
          800: "#ff0080",
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
          background: {
            green: {
              normal: "green.500",
            },
          },
          text: {
            green: {
              default: "green.500",
            },
            red: {
              bold: {
                default: "red.800",
                _dark: "red.700",
              },
              subtle: {
                default: "red.500",
                _dark: "red.400",
              },
            },
          },
        },
      },
    }
    const semanticTokenKeys = extractSemanticTokenKeys(theme, "colors")
    expect(semanticTokenKeys).toMatchInlineSnapshot(`
[
  "primary",
  "secondary",
  "error",
  "success",
  "background.green.normal",
  "text.green",
  "text.red.bold",
  "text.red.subtle",
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
    expect(semanticTokenKeys).toMatchInlineSnapshot(`[]`)
  })
  it("should handle missing properties", () => {
    const theme = {}
    const semanticTokenKeys = extractSemanticTokenKeys(theme, "colors")
    expect(semanticTokenKeys).toMatchInlineSnapshot(`[]`)
  })
})
