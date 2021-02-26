import { createBreakpoints } from "@chakra-ui/theme-tools"
import { analyzeBreakpoints } from "../src/breakpoints"

test("should work correctly", () => {
  expect(
    analyzeBreakpoints({
      sm: "320px",
      md: "640px",
      lg: "1000px",
      xl: "4000px",
    })?.details,
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoint": "base",
        "maxW": "319px",
        "maxWQuery": "@media screen and (max-width: 319px)",
        "minMaxQuery": "@media screen and (min-width: 0px) and @media screen and (max-width: 319px)",
        "minW": "0px",
        "minWQuery": "@media screen and (min-width: 0px)",
      },
      Object {
        "breakpoint": "sm",
        "maxW": "639px",
        "maxWQuery": "@media screen and (max-width: 639px)",
        "minMaxQuery": "@media screen and (min-width: 320px) and @media screen and (max-width: 639px)",
        "minW": "320px",
        "minWQuery": "@media screen and (min-width: 320px)",
      },
      Object {
        "breakpoint": "md",
        "maxW": "999px",
        "maxWQuery": "@media screen and (max-width: 999px)",
        "minMaxQuery": "@media screen and (min-width: 640px) and @media screen and (max-width: 999px)",
        "minW": "640px",
        "minWQuery": "@media screen and (min-width: 640px)",
      },
      Object {
        "breakpoint": "lg",
        "maxW": "3999px",
        "maxWQuery": "@media screen and (max-width: 3999px)",
        "minMaxQuery": "@media screen and (min-width: 1000px) and @media screen and (max-width: 3999px)",
        "minW": "1000px",
        "minWQuery": "@media screen and (min-width: 1000px)",
      },
      Object {
        "breakpoint": "xl",
        "maxW": undefined,
        "maxWQuery": "",
        "minMaxQuery": "@media screen and (min-width: 4000px)",
        "minW": "4000px",
        "minWQuery": "@media screen and (min-width: 4000px)",
      },
    ]
  `)
})

// Ensures no breaking change
test("should work with createBreakpoint output", () => {
  expect(
    analyzeBreakpoints(
      createBreakpoints({
        sm: "320px",
        md: "640px",
        lg: "1000px",
        xl: "4000px",
      }),
    )?.details,
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoint": "base",
        "maxW": "319px",
        "maxWQuery": "@media screen and (max-width: 319px)",
        "minMaxQuery": "@media screen and (min-width: 0px) and @media screen and (max-width: 319px)",
        "minW": "0px",
        "minWQuery": "@media screen and (min-width: 0px)",
      },
      Object {
        "breakpoint": "sm",
        "maxW": "639px",
        "maxWQuery": "@media screen and (max-width: 639px)",
        "minMaxQuery": "@media screen and (min-width: 320px) and @media screen and (max-width: 639px)",
        "minW": "320px",
        "minWQuery": "@media screen and (min-width: 320px)",
      },
      Object {
        "breakpoint": "md",
        "maxW": "999px",
        "maxWQuery": "@media screen and (max-width: 999px)",
        "minMaxQuery": "@media screen and (min-width: 640px) and @media screen and (max-width: 999px)",
        "minW": "640px",
        "minWQuery": "@media screen and (min-width: 640px)",
      },
      Object {
        "breakpoint": "lg",
        "maxW": "3999px",
        "maxWQuery": "@media screen and (max-width: 3999px)",
        "minMaxQuery": "@media screen and (min-width: 1000px) and @media screen and (max-width: 3999px)",
        "minW": "1000px",
        "minWQuery": "@media screen and (min-width: 1000px)",
      },
      Object {
        "breakpoint": "xl",
        "maxW": undefined,
        "maxWQuery": "",
        "minMaxQuery": "@media screen and (min-width: 4000px)",
        "minW": "4000px",
        "minWQuery": "@media screen and (min-width: 4000px)",
      },
    ]
  `)
})
