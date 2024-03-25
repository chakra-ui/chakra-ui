import { createSystem } from "../src/styled-system/system"

const { cva } = createSystem({
  conditions: {
    hover: "&:hover",
    focus: "&:focus",
    active: "&:active",
  },
  theme: {
    breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
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

describe("cva", () => {
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
        "color": "var(--chakra-colors-pink-400)",
        "marginTop": "md",
      }
    `)
  })

  test("responsive", () => {
    const result = cva({
      base: {
        color: "pink.400",
        marginTop: "100px",
      },
      variants: {
        size: {
          sm: {
            mt: "20px",
          },
          md: {
            mt: "30px",
          },
        },
        caps: {
          true: {
            textTransform: "uppercase",
          },
        },
      },
    })

    expect(result({ size: ["sm", "md"], caps: true })).toMatchInlineSnapshot(`
      {
        "@media screen and (min-width: 30rem)": {
          "marginTop": "30px",
        },
        "color": "var(--chakra-colors-pink-400)",
        "marginTop": "20px",
        "textTransform": "uppercase",
      }
    `)
  })
})
