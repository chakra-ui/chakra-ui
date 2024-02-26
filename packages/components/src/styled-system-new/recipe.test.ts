import { createConditions } from "./conditions"
import { createCssFn } from "./css"
import { createRecipeFn } from "./recipe"
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
const cva = createRecipeFn({ css })

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
