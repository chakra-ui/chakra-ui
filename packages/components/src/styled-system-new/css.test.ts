import { createSystem } from "./system"

const { css } = createSystem({
  conditions: {
    hover: "&:hover",
    focus: "&:focus",
    active: "&:active",
  },
  utilities: {
    marginTop: { shorthand: "mt", values: "spacing" },
    color: { values: "colors" },
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
        pink: { 400: { value: "#pink400" } },
      },
    },
    semanticTokens: {},
  },
})

describe("create css", () => {
  test("works", () => {
    expect(
      css({
        "--bg": "colors.pink.400",
        color: "red",
        _hover: { color: "pink!" },
        mt: { base: "40px", md: "20px" },
        padding: ["10px", "20px"],
      }),
    ).toMatchInlineSnapshot(`
      {
        "&:hover": {
          "color": "pink !important",
        },
        "--bg": "var(--colors\\.pink\\.400)",
        "@media (min-width: 30em)": {
          "padding": "20px",
        },
        "@media (min-width: 48em)": {
          "marginTop": "20px",
        },
        "color": "red",
        "marginTop": "40px",
        "padding": "10px",
      }
    `)
  })
})
