import { createSystem } from "./system"

const { cva } = createSystem({
  conditions: {
    hover: "&:hover",
    focus: "&:focus",
    active: "&:active",
  },
  theme: {
    breakpoints: {
      sm: "@media (min-width: 30em)",
      md: "@media (min-width: 48em)",
      lg: "@media (min-width: 62em)",
      xl: "@media (min-width: 80em)",
    },
    tokens: {
      colors: {
        pink: {
          400: { value: "#pink400" },
        },
      },
    },
    semanticTokens: {},
  },
  utilities: {
    marginTop: { shorthand: "mt", values: "spacing" },
    color: { values: "colors" },
  },
})

describe("recipe", () => {
  test("it works", () => {
    const result = cva({
      base: {
        color: "pink.400",
        marginTop: "sm",
      },
      variants: {
        size: {
          sm: {
            mt: "md",
          },
        },
      },
    })

    expect(result.variantKeys).toMatchInlineSnapshot(`
      [
        "size",
      ]
    `)

    expect(result.variantMap).toMatchInlineSnapshot(`
      {
        "size": [
          "sm",
        ],
      }
    `)

    expect(result({ size: "sm" })).toMatchInlineSnapshot(`
      {
        "color": "pink.400",
        "marginTop": "md",
      }
    `)
  })
})
