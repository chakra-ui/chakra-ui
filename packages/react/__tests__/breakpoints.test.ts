import { createBreakpoints } from "../src/styled-system/breakpoints"

describe("breakpoints", () => {
  test("works", () => {
    const result = createBreakpoints({
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    })

    expect(result.conditions).toMatchInlineSnapshot(`
      {
        "2xl": "@media screen and (min-width: 96rem)",
        "2xlDown": "@media screen and (max-width: 95.9975rem)",
        "2xlOnly": "@media screen and (min-width: 96rem)",
        "lg": "@media screen and (min-width: 62rem)",
        "lgDown": "@media screen and (max-width: 61.9975rem)",
        "lgOnly": "@media screen and (min-width: 62rem) and (max-width: 79.9975rem)",
        "lgTo2xl": "@media screen and (min-width: 62rem) and (max-width: 95.9975rem)",
        "lgToXl": "@media screen and (min-width: 62rem) and (max-width: 79.9975rem)",
        "md": "@media screen and (min-width: 48rem)",
        "mdDown": "@media screen and (max-width: 47.9975rem)",
        "mdOnly": "@media screen and (min-width: 48rem) and (max-width: 61.9975rem)",
        "mdTo2xl": "@media screen and (min-width: 48rem) and (max-width: 95.9975rem)",
        "mdToLg": "@media screen and (min-width: 48rem) and (max-width: 61.9975rem)",
        "mdToXl": "@media screen and (min-width: 48rem) and (max-width: 79.9975rem)",
        "sm": "@media screen and (min-width: 30rem)",
        "smDown": "@media screen and (max-width: 29.9975rem)",
        "smOnly": "@media screen and (min-width: 30rem) and (max-width: 47.9975rem)",
        "smTo2xl": "@media screen and (min-width: 30rem) and (max-width: 95.9975rem)",
        "smToLg": "@media screen and (min-width: 30rem) and (max-width: 61.9975rem)",
        "smToMd": "@media screen and (min-width: 30rem) and (max-width: 47.9975rem)",
        "smToXl": "@media screen and (min-width: 30rem) and (max-width: 79.9975rem)",
        "xl": "@media screen and (min-width: 80rem)",
        "xlDown": "@media screen and (max-width: 79.9975rem)",
        "xlOnly": "@media screen and (min-width: 80rem) and (max-width: 95.9975rem)",
        "xlTo2xl": "@media screen and (min-width: 80rem) and (max-width: 95.9975rem)",
      }
    `)
  })
})
