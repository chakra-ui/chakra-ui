import { createBreakpoints } from "@chakra-ui/theme-tools"
import { analyzeBreakpoints } from "../src/breakpoints"
import { css } from "../src"
import { createTheme } from "./theme"
import { expandResponsive } from "../src/css"

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
        "minMaxQuery": "@media screen and (min-width: 0em) and @media screen and (max-width: 319px)",
        "minW": "0em",
        "minWQuery": "@media screen and (min-width: 0em)",
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

test("should handle array responsive values", () => {
  expect(
    css({
      //@ts-ignore
      "&": [
        { marginTop: 2, marginLeft: 0 },
        { marginLeft: 2, marginTop: 0 },
      ],
    })(createTheme("ltr")),
  ).toMatchObject({
    "&": {
      marginTop: "2px",
      marginLeft: "0px",
    },
    "@media screen and (min-width: 40em)": {
      "&": {
        marginLeft: "2px",
        marginTop: "0px",
      },
    },
  })
})

test("should work with stack", () => {
  const result = expandResponsive({
    //@ts-ignore
    "& > *:not(style) ~ *:not(style)": [
      { marginTop: "40px", marginStart: 0 },
      { marginStart: "40px", marginTop: 0 },
    ],
  })(createTheme("ltr"))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "& > *:not(style) ~ *:not(style)": Object {
        "marginStart": 0,
        "marginTop": "40px",
      },
      "@media screen and (min-width: 40em)": Object {
        "& > *:not(style) ~ *:not(style)": Object {
          "marginStart": "40px",
          "marginTop": 0,
        },
      },
    }
  `)
})

test("should not add (min-width: 0px) for object notation", () => {
  expect(css({ margin: { base: 4, md: 6 } })(createTheme("rtl")))
    .toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {},
      "@media screen and (min-width: 52em)": Object {
        "margin": "6px",
      },
      "margin": "4px",
    }
  `)
})
