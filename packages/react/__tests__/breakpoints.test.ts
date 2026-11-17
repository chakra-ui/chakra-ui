import { defaultConfig } from "../src/preset"
import { createBreakpoints } from "../src/styled-system/breakpoints"
import { createSystem } from "../src/styled-system/system"

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

describe("custom breakpoint ordering", () => {
  test.each([
    { sm: "640px", md: "48rem", lg: "1024px" },
    { lg: "64em", md: "768px", sm: "40rem" },
    { lg: "1024px", sm: "640px", md: "768px" },
  ])("sorts supported units by width: %j", (breakpoints) => {
    const result = createBreakpoints(breakpoints)

    expect(result.keys()).toEqual(["base", "sm", "md", "lg"])
    expect(result.values).toEqual([
      { name: "sm", min: "40rem", max: "47.9975rem" },
      { name: "md", min: "48rem", max: "63.9975rem" },
      { name: "lg", min: "64rem", max: undefined },
    ])
    expect(result.only("md")).toBe(
      "@media screen and (min-width: 48rem) and (max-width: 63.9975rem)",
    )
    expect(result.up("md")).toBe("@media screen and (min-width: 48rem)")
    expect(result.down("md")).toBe("@media screen and (max-width: 47.9975rem)")
    expect(result.conditions.smToMd).toBe(
      "@media screen and (min-width: 40rem) and (max-width: 47.9975rem)",
    )
  })

  test.each([
    [{ wide: "48.75rem", narrow: "48.25rem" }, "48.25rem", "48.7475rem"],
    [{ wide: "48.75em", narrow: "48.25em" }, "48.25rem", "48.7475rem"],
    [{ wide: "780.5px", narrow: "780.25px" }, "48.765625rem", "48.77875rem"],
  ])("sorts fractional widths: %j", (breakpoints, min, max) => {
    const result = createBreakpoints(breakpoints as Record<string, string>)

    expect(result.keys()).toEqual(["base", "narrow", "wide"])
    expect(result.only("narrow")).toBe(
      `@media screen and (min-width: ${min}) and (max-width: ${max})`,
    )
    expect(result.only("wide")).toBe(result.up("wide"))
  })

  test("preserves declaration order for equal normalized widths", () => {
    const result = createBreakpoints({
      first: "768px",
      second: "48rem",
      third: "48em",
    })

    expect(result.keys()).toEqual(["base", "first", "second", "third"])
    expect(result.values.map(({ min }) => min)).toEqual([
      "48rem",
      "48rem",
      "48rem",
    ])
  })

  test("keeps default widths in order when one breakpoint uses rem", () => {
    const system = createSystem(defaultConfig, {
      theme: { breakpoints: { md: "48rem" } },
    })

    expect(system.breakpoints.keys()).toEqual([
      "base",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ])
    expect(system.css({ color: ["red", "green", "blue"] })).toEqual({
      color: "red",
      "@media screen and (min-width: 30rem)": { color: "green" },
      "@media screen and (min-width: 48rem)": { color: "blue" },
    })
  })

  test("maps responsive arrays to ascending widths in the public system", () => {
    const system = createSystem({
      theme: { breakpoints: { sm: "640px", md: "48rem", lg: "1024px" } },
    })

    expect(system.css({ color: ["red", "green", "blue", "purple"] })).toEqual({
      color: "red",
      "@media screen and (min-width: 40rem)": { color: "green" },
      "@media screen and (min-width: 48rem)": { color: "blue" },
      "@media screen and (min-width: 64rem)": { color: "purple" },
    })
    expect(system.css({ color: { mdOnly: "blue" } })).toEqual({
      "@media screen and (min-width: 48rem) and (max-width: 63.9975rem)": {
        color: "blue",
      },
    })
  })
})
