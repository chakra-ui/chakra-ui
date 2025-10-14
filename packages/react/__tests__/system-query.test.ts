import { createSystem } from "../src/styled-system"

describe("system query engine", () => {
  const mockSystem = createSystem({
    cssVarsPrefix: "chakra",
    theme: {
      textStyles: {
        "heading.lg": {
          value: {
            fontSize: "2xl",
            fontWeight: "bold",
            lineHeight: "shorter",
          },
        },
        "body.md": {
          value: {
            fontSize: "md",
            lineHeight: "1.5",
          },
        },
        nested: {
          sub: {
            value: {
              fontSize: "lg",
              fontWeight: "semibold",
            },
          },
        },
      },
      layerStyles: {
        "card.elevated": {
          value: {
            background: "white",
            boxShadow: "lg",
            borderRadius: "md",
          },
        },
        "fill.solid": {
          value: {
            background: "colorPalette.solid",
            color: "colorPalette.contrast",
          },
        },
      },
      animationStyles: {
        spin: {
          value: {
            animation: "spin 1s linear infinite",
          },
        },
      },
      tokens: {
        colors: {
          primary: { value: "#007bff" },
          secondary: { value: "#6c757d" },
        },
        spacing: {
          sm: { value: "0.5rem" },
          md: { value: "1rem" },
        },
      },
      semanticTokens: {
        colors: {
          background: {
            value: { _light: "#007bff", _dark: "#6c757d" },
          },
          foreground: {
            value: { _light: "#6c757d", _dark: "#007bff" },
          },
          accent: {
            muted: { value: { _light: "#6c757d", _dark: "#007bff" } },
          },
        },
      },
      recipes: {
        button: {
          base: { px: 4, py: 2 },
          variants: {
            size: {
              sm: { px: 2, py: 1 },
              lg: { px: 6, py: 3 },
            },
          },
        },
      },
      slotRecipes: {
        card: {
          slots: ["root", "header", "body"],
          base: {
            root: { borderRadius: "md" },
          },
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      breakpoints: {
        sm: "30em",
        md: "48em",
        lg: "62em",
      },
    },
  })

  test("should have query properties", () => {
    expect(mockSystem.query).toBeDefined()
    expect(typeof mockSystem.query).toBe("object")

    expect(mockSystem.query.textStyles.list()).toMatchInlineSnapshot(`
      [
        "heading.lg",
        "body.md",
        "nested.sub",
      ]
    `)

    expect(mockSystem.query.layerStyles.list()).toMatchInlineSnapshot(`
      [
        "card.elevated",
        "fill.solid",
      ]
    `)

    expect(mockSystem.query.animationStyles.list()).toMatchInlineSnapshot(`
      [
        "spin",
      ]
    `)

    expect(mockSystem.query.tokens.list("colors")).toMatchInlineSnapshot(`
      [
        "primary",
        "secondary",
      ]
    `)

    expect(mockSystem.query.semanticTokens.list("colors"))
      .toMatchInlineSnapshot(`
        [
          "background",
          "foreground",
          "accent.muted",
        ]
      `)

    expect(mockSystem.query.keyframes.list()).toMatchInlineSnapshot(`
      [
        "fadeIn",
      ]
    `)

    expect(mockSystem.query.breakpoints.list()).toMatchInlineSnapshot(`
      [
        "sm",
        "md",
        "lg",
      ]
    `)
  })
})
