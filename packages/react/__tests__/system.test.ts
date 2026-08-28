import { createSystem } from "../src"

describe("system", () => {
  test("should resolve color palette", () => {
    const { tokens } = createSystem({
      theme: {
        tokens: {
          colors: {
            green: { 300: { value: "#68D391" } },
            red: { 300: { value: "#red300" } },
            pink: { 400: { value: "#pink400" } },
            primary: { value: "tomato" },
            secondary: { value: "cyan" },
          },
        },
      },
    })

    expect(tokens.colorPaletteMap).toMatchInlineSnapshot(`
      Map {
        "green" => Map {
          "--chakra-colors-color-palette-300" => "var(--chakra-colors-green-300)",
        },
        "red" => Map {
          "--chakra-colors-color-palette-300" => "var(--chakra-colors-red-300)",
        },
        "pink" => Map {
          "--chakra-colors-color-palette-400" => "var(--chakra-colors-pink-400)",
        },
        "primary" => Map {
          "--chakra-colors-color-palette" => "var(--chakra-colors-primary)",
        },
        "secondary" => Map {
          "--chakra-colors-color-palette" => "var(--chakra-colors-secondary)",
        },
      }
    `)
  })
})
