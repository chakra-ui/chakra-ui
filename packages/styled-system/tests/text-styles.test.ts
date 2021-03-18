import defaultTheme from "@chakra-ui/theme"
import { toCSSVar, css } from "../src"

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

test("should merge reponsive values in textStyles with other responsive styles", () => {
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

test("should merge reponsive values in textStyles + override", () => {
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
