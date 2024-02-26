import { createConditions } from "./conditions"
import { createCssFn } from "./css"
import { createTokenDictionary } from "./token-dictionary"
import { SystemContext } from "./types"
import { createUtilty } from "./utility"

const conditions = createConditions({
  breakpoints: {
    sm: "@media (min-width: 30em)",
    md: "@media (min-width: 48em)",
    lg: "@media (min-width: 62em)",
    xl: "@media (min-width: 80em)",
  },
  conditions: {
    hover: "&:hover",
    focus: "&:focus",
    active: "&:active",
  },
})

const tokens = createTokenDictionary({
  tokens: {
    colors: {
      pink: {
        400: { value: "#pink400" },
      },
    },
  },
  semanticTokens: {},
})

const utility = createUtilty({
  tokens,
  config: {
    marginTop: { shorthand: "mt", values: "spacing" },
    color: { values: "colors" },
  },
})

const context: SystemContext = {
  tokens,
  utility,
  conditions,
}

const css = createCssFn(context)

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
