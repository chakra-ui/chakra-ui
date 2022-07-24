import { toCSSVar, css } from "../src"

const defaultTheme = {
  config: {
    cssVarPrefix: "chakra",
  },
  breakpoints: {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  space: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
}

const theme = toCSSVar({
  ...defaultTheme,
  textStyles: {
    big: {
      fontSize: "40px",
      lineHeight: "80px",
    },
    responsiveValue: {
      fontSize: { base: "10px", sm: "20px" },
    },
    h1: {
      fontWeight: "bold",
      fontSize: { base: "2xl", sm: "4xl" },
      color: { base: "blue", sm: "red" },
    },
  },
})

test("should override text style", () => {
  expect(css({ textStyle: "big", fontSize: "60px" })(theme)).toMatchObject({
    fontSize: "60px",
    lineHeight: "80px",
  })
})

test("should override responsive style", () => {
  expect(
    css({ textStyle: "responsiveValue", fontSize: "60px" })(theme),
  ).toMatchObject({
    fontSize: "60px",
  })
})

test("should merge responsive values in textStyles with other responsive styles", () => {
  expect(
    css({
      textStyle: "h1",
      mt: [3, 4],
    })(theme),
  ).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 30em)": Object {
        "color": "red",
        "fontSize": "var(--chakra-fontSizes-4xl)",
        "marginTop": "var(--chakra-space-4)",
      },
      "color": "blue",
      "fontSize": "var(--chakra-fontSizes-2xl)",
      "fontWeight": "var(--chakra-fontWeights-bold)",
      "marginTop": "var(--chakra-space-3)",
    }
  `)
})

test("should merge responsive values in textStyles + override", () => {
  expect(
    css({
      textStyle: "h1",
      mt: [3, 4],
      fontSize: "30px",
    })(theme),
  ).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 30em)": Object {
        "color": "red",
        "marginTop": "var(--chakra-space-4)",
      },
      "color": "blue",
      "fontSize": "30px",
      "fontWeight": "var(--chakra-fontWeights-bold)",
      "marginTop": "var(--chakra-space-3)",
    }
  `)
})
