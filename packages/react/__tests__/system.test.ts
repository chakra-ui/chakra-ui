import { createSystem } from "../src"

describe("system", () => {
  test("should generate token css", () => {
    const sys = createSystem({
      cssVarsRoot: ":where(html)",
      conditions: {
        dark: ".dark &",
      },
      theme: {
        tokens: {
          colors: {
            primary: { value: "#000" },
          },
        },
        semanticTokens: {
          colors: {
            test: { value: { _dark: "pink" } },
          },
        },
      },
    })

    expect(sys.getTokenCss()).toMatchInlineSnapshot(`
      {
        "@layer tokens": {
          "&:where(html)": {
            "--chakra-colors-primary": "#000",
            "--chakra-colors-test": "",
          },
          ".dark &": {
            "--chakra-colors-test": "pink",
          },
        },
      }
    `)
  })

  test("should generate global css", () => {
    const sys = createSystem({
      utilities: {
        background: { shorthand: ["bg"], values: "colors" },
      },
      globalCss: {
        body: {
          bg: "primary",
        },
      },
      theme: {
        keyframes: {
          spin: {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
          pulse: {
            from: { opacity: 1 },
            to: { opacity: 0 },
          },
        },
        tokens: {
          colors: {
            primary: { value: "#000" },
          },
        },
        semanticTokens: {
          colors: {
            test: { value: { _dark: "pink" } },
          },
        },
      },
    })

    expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
      {
        "@layer base": {
          "&body": {
            "background": "var(--chakra-colors-primary)",
          },
          "@keyframes pulse": {
            "from": {
              "opacity": 1,
            },
            "to": {
              "opacity": 0,
            },
          },
          "@keyframes spin": {
            "from": {
              "transform": "rotate(0deg)",
            },
            "to": {
              "transform": "rotate(360deg)",
            },
          },
        },
      }
    `)
  })

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

  test("should resolve token references", () => {
    const sys = createSystem({
      theme: {
        tokens: {
          colors: {
            primary: { value: "tomato" },
          },
          borders: {
            initial: { value: "1px solid {colors.primary}" },
          },
        },
      },
    })

    expect(sys.getTokenCss()).toMatchInlineSnapshot(`
      {
        "@layer tokens": {
          "&:where(:root, :host)": {
            "--chakra-borders-initial": "1px solid var(--chakra-colors-primary)",
            "--chakra-colors-primary": "tomato",
          },
        },
      }
    `)
  })
})
