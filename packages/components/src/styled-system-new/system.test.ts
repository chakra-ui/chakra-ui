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
})
