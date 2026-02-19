import { createSystem, defaultConfig } from "../src"

describe("serialize - top-level selector handling", () => {
  describe("regular selectors", () => {
    test("regular custom selector should get & prefix", () => {
      const sys = createSystem({
        globalCss: {
          ".custom-class": {
            color: "red",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&.custom-class": {
              "color": "red",
            },
          },
        }
      `)
    })

    test("multiple regular selectors with comma should get & prefix", () => {
      const sys = createSystem({
        globalCss: {
          ".class-a, .class-b": {
            color: "red",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&.class-a, &.class-b": {
              "color": "red",
            },
          },
        }
      `)
    })
  })

  describe(":host selector (Shadow DOM)", () => {
    test(":host selector should transform to top-level with & suffix", () => {
      const sys = createSystem({
        globalCss: {
          ":host": {
            color: "red",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host &": {
              "color": "red",
            },
          },
        }
      `)
    })

    test(":host(.dark) with class argument should have & suffix", () => {
      const sys = createSystem({
        globalCss: {
          ":host(.dark)": {
            color: "white",
            backgroundColor: "black",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host(.dark) &": {
              "backgroundColor": "black",
              "color": "white",
            },
          },
        }
      `)
    })

    test(":host([theme='dark']) with attribute selector should have & suffix", () => {
      const sys = createSystem({
        globalCss: {
          ":host([theme='dark'])": {
            color: "white",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host([theme='dark']) &": {
              "color": "white",
            },
          },
        }
      `)
    })

    test(":host-context selector should have & suffix for top-level context", () => {
      const sys = createSystem({
        globalCss: {
          ":host-context(.dark)": {
            color: "white",
            backgroundColor: "black",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host-context(.dark) &": {
              "backgroundColor": "black",
              "color": "white",
            },
          },
        }
      `)
    })

    test(":host-context(body.mobile) with complex selector", () => {
      const sys = createSystem({
        globalCss: {
          ":host-context(body.mobile)": {
            fontSize: "14px",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host-context(body.mobile) &": {
              "fontSize": "14px",
            },
          },
        }
      `)
    })
  })

  describe("mixed selectors", () => {
    test("mixing :host with regular selector should handle both correctly", () => {
      const sys = createSystem({
        globalCss: {
          ":host(.dark), .fallback": {
            color: "white",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host(.dark) &, &.fallback": {
              "color": "white",
            },
          },
        }
      `)
    })

    test("mixing :host-context with regular selector", () => {
      const sys = createSystem({
        globalCss: {
          ":host-context(.dark), .theme-dark": {
            backgroundColor: "black",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host-context(.dark) &, &.theme-dark": {
              "backgroundColor": "black",
            },
          },
        }
      `)
    })
  })

  describe("complex scenarios", () => {
    test("multiple :host selectors", () => {
      const sys = createSystem({
        globalCss: {
          ":host(.dark), :host(.high-contrast)": {
            color: "white",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host(.dark) &, :host(.high-contrast) &": {
              "color": "white",
            },
          },
        }
      `)
    })

    test("nested styles with :host selector", () => {
      const sys = createSystem({
        globalCss: {
          body: {
            color: "red",
          },
          ":host(.dark)": {
            color: "white",
            backgroundColor: "black",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&body": {
              "color": "red",
            },
            ":host(.dark) &": {
              "backgroundColor": "black",
              "color": "white",
            },
          },
        }
      `)
    })

    test("selector with parentheses should parse correctly", () => {
      const sys = createSystem({
        globalCss: {
          ":host(.theme-dark, .theme-high-contrast)": {
            color: "white",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":host(.theme-dark, .theme-high-contrast) &": {
              "color": "white",
            },
          },
        }
      `)
    })
  })

  describe("other top-level selectors", () => {
    test(":root selector should NOT transform (normal selector)", () => {
      const sys = createSystem({
        globalCss: {
          ":root": {
            colorScheme: "dark",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&:root": {
              "colorScheme": "dark",
            },
          },
        }
      `)
    })

    test("::slotted() selector for Shadow DOM should have & suffix", () => {
      const sys = createSystem({
        globalCss: {
          "::slotted(*)": {
            color: "red",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "::slotted(*) &": {
              "color": "red",
            },
          },
        }
      `)
    })

    test("::slotted() with specific element", () => {
      const sys = createSystem({
        globalCss: {
          "::slotted(button)": {
            padding: "10px",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "::slotted(button) &": {
              "padding": "10px",
            },
          },
        }
      `)
    })

    test("::part() selector should NOT transform (normal selector)", () => {
      const sys = createSystem({
        globalCss: {
          "::part(button)": {
            color: "blue",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&::part(button)": {
              "color": "blue",
            },
          },
        }
      `)
    })

    test("::part() with multiple parts should NOT transform", () => {
      const sys = createSystem({
        globalCss: {
          "::part(header footer)": {
            backgroundColor: "gray",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&::part(header footer)": {
              "backgroundColor": "gray",
            },
          },
        }
      `)
    })

    test("mixing :host (transforms) with :root (doesn't transform)", () => {
      const sys = createSystem({
        globalCss: {
          ":root, :host": {
            fontSize: "16px",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&:root, :host &": {
              "fontSize": "16px",
            },
          },
        }
      `)
    })
  })

  describe("edge cases", () => {
    test("selector with escaped characters", () => {
      const sys = createSystem({
        globalCss: {
          ".class\\:with\\:colons": {
            color: "red",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&.class\\:with\\:colons": {
              "color": "red",
            },
          },
        }
      `)
    })

    test("pseudo-element selectors should have & prefix (non-top-level)", () => {
      const sys = createSystem({
        globalCss: {
          "::before": {
            content: '""',
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&::before": {
              "content": """",
            },
          },
        }
      `)
    })

    test("attribute selector should have & prefix", () => {
      const sys = createSystem({
        globalCss: {
          "[data-theme='dark']": {
            color: "white",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&[data-theme='dark']": {
              "color": "white",
            },
          },
        }
      `)
    })
  })

  describe("edge case fixes", () => {
    test("case-insensitive :host matching", () => {
      const sys = createSystem({
        globalCss: {
          ":HOST": {
            color: "red",
          },
          ":Host(.dark)": {
            color: "white",
          },
          ":HOST-CONTEXT(.mobile)": {
            fontSize: "14px",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            ":HOST &": {
              "color": "red",
            },
            ":HOST-CONTEXT(.mobile) &": {
              "fontSize": "14px",
            },
            ":Host(.dark) &": {
              "color": "white",
            },
          },
        }
      `)
    })

    test(":root should not transform (removed from list)", () => {
      const sys = createSystem({
        globalCss: {
          ":root": {
            "--primary": "blue",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&:root": {
              "--primary": "blue",
            },
          },
        }
      `)
    })

    test("::part should not transform (removed from list)", () => {
      const sys = createSystem({
        globalCss: {
          "::part(button)": {
            color: "blue",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&::part(button)": {
              "color": "blue",
            },
          },
        }
      `)
    })
  })

  describe("element selectors matching utility shorthands", () => {
    test("p element should be treated as selector, not padding", () => {
      const sys = createSystem({
        globalCss: {
          p: {
            margin: "0 0 1em",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&p": {
              "margin": "0 0 1em",
            },
          },
        }
      `)
    })

    test("multiple element selectors matching shorthands", () => {
      const sys = createSystem({
        globalCss: {
          p: {
            margin: "0 0 1em",
          },
          h1: {
            fontSize: "2em",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&h1": {
              "fontSize": "2em",
            },
            "&p": {
              "margin": "0 0 1em",
            },
          },
        }
      `)
    })

    test("compound selector with utility shorthand element should work", () => {
      const sys = createSystem({
        globalCss: {
          "p, h1, h2, h3": {
            margin: "0 0 1em",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&p, &h1, &h2, &h3": {
              "margin": "0 0 1em",
            },
          },
        }
      `)
    })

    test("responsive utility value should still work (not confused for selector)", () => {
      const sys = createSystem(defaultConfig, {
        globalCss: {
          body: {
            p: { base: "4", md: "8" },
          },
        },
      })

      const result = sys.getGlobalCss()
      expect(result["@layer base"]["&body"]).toMatchInlineSnapshot(`
        {
          "@media screen and (min-width: 48rem)": {
            "padding": "var(--chakra-spacing-8)",
          },
          "padding": "var(--chakra-spacing-4)",
        }
      `)
    })

    test("element selector with nested pseudo condition", () => {
      const sys = createSystem({
        globalCss: {
          p: {
            color: "black",
            _hover: {
              color: "blue",
            },
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&p": {
              "_hover": {
                "color": "blue",
              },
              "color": "black",
            },
          },
        }
      `)
    })

    test("is(p) workaround should still work", () => {
      const sys = createSystem({
        globalCss: {
          ":is(p)": {
            margin: "0 0 1em",
          },
        },
      })

      expect(sys.getGlobalCss()).toMatchInlineSnapshot(`
        {
          "@layer base": {
            "&:is(p)": {
              "margin": "0 0 1em",
            },
          },
        }
      `)
    })
  })
})
