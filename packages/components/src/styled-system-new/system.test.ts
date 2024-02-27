import { createSystem } from "./system"

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
        "&:where(html)": {
          "--colors-primary": "#000",
          "--colors-test": "",
        },
        ".dark &": {
          "--colors-test": "pink",
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
        "&body": {
          "background": "var(--colors-primary)",
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
          "--colors-color-palette-300" => "var(--colors-green-300)",
        },
        "red" => Map {
          "--colors-color-palette-300" => "var(--colors-red-300)",
        },
        "pink" => Map {
          "--colors-color-palette-400" => "var(--colors-pink-400)",
        },
        "primary" => Map {
          "--colors-color-palette" => "var(--colors-primary)",
        },
        "secondary" => Map {
          "--colors-color-palette" => "var(--colors-secondary)",
        },
      }
    `)
  })
})
