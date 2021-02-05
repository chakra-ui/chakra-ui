import { createBreakpoints } from "@chakra-ui/theme-tools"
import { resolveResponsivePropStyles } from "../src/resolve-responsive-prop-styles"

const breakpointsInPx = createBreakpoints({
  sm: "100px",
  md: "200px",
  lg: "300px",
  xl: "400px",
  xxl: "500px",
  customBreakpoint: "600px",
})

const breakpointsInEm = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
  xxl: "100em",
  customBreakpoint: "120em",
})

const responsiveStyles = {
  solid: ({ colorScheme: c }: Record<string, any>) => ({
    color: `${c}.800`,
    bg: `${c}.200`,
  }),
  outline: {
    borderColor: "gray.300",
    borderWidth: 1,
  },
  link: {
    textDecoration: "underline",
  },
}

const multipartComponentParts = ["field", "addon"]

const responsiveMultipartStyles = {
  solid: ({ colorScheme: c }: Record<string, any>) => ({
    field: {
      color: `${c}.800`,
      bg: `${c}.200`,
    },
    addon: {
      opacity: 0.5,
    },
  }),
  outline: {
    field: {
      borderColor: "gray.300",
      borderWidth: 1,
    },
    addon: {
      opacity: 0.8,
    },
  },
  link: {
    field: {
      textDecoration: "underline",
    },
    addon: {
      display: "none",
    },
  },
}

const responsiveValueArray = [
  "solid",
  "outline",
  null,
  "link",
  null,
  null,
  "outline",
]

const props = {
  colorScheme: "purple",
}

test("resolves styles for responsive variant (breakpoints in px)", () => {
  expect(
    resolveResponsivePropStyles({
      breakpoints: breakpointsInPx,
      responsiveValue: responsiveValueArray,
      responsiveStyles: responsiveStyles,
      props,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "@media (max-width: 99px)": Object {
        "bg": "purple.200",
        "color": "purple.800",
      },
      "@media (min-width: 100px) and (max-width: 299px)": Object {
        "borderColor": "gray.300",
        "borderWidth": 1,
      },
      "@media (min-width: 300px) and (max-width: 599px)": Object {
        "textDecoration": "underline",
      },
      "@media (min-width: 600px)": Object {
        "borderColor": "gray.300",
        "borderWidth": 1,
      },
    }
  `)
})

test("resolves styles for responsive variant (breakpoints in em)", () => {
  expect(
    resolveResponsivePropStyles({
      breakpoints: breakpointsInEm,
      responsiveValue: responsiveValueArray,
      responsiveStyles: responsiveStyles,
      props,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "@media (max-width: 39.99em)": Object {
        "bg": "purple.200",
        "color": "purple.800",
      },
      "@media (min-width: 120em)": Object {
        "borderColor": "gray.300",
        "borderWidth": 1,
      },
      "@media (min-width: 40em) and (max-width: 63.99em)": Object {
        "borderColor": "gray.300",
        "borderWidth": 1,
      },
      "@media (min-width: 64em) and (max-width: 119.99em)": Object {
        "textDecoration": "underline",
      },
    }
  `)
})

test("resolves styles for non-responsive value (breakpoints in em)", () => {
  expect(
    resolveResponsivePropStyles({
      breakpoints: breakpointsInEm,
      responsiveValue: "outline",
      responsiveStyles: responsiveStyles,
      props,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "borderColor": "gray.300",
      "borderWidth": 1,
    }
  `)
})

test("resolves styles with fn for non-responsive value (breakpoints in em)", () => {
  expect(
    resolveResponsivePropStyles({
      breakpoints: breakpointsInEm,
      responsiveValue: "solid",
      responsiveStyles: responsiveStyles,
      props,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "bg": "purple.200",
      "color": "purple.800",
    }
  `)
})

test("resolves styles for responsive multipart variant (breakpoints in em)", () => {
  expect(
    resolveResponsivePropStyles({
      breakpoints: breakpointsInEm,
      responsiveValue: responsiveValueArray,
      responsiveStyles: responsiveMultipartStyles,
      parts: multipartComponentParts,
      props,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "addon": Object {
        "@media (max-width: 39.99em)": Object {
          "opacity": 0.5,
        },
        "@media (min-width: 120em)": Object {
          "opacity": 0.8,
        },
        "@media (min-width: 40em) and (max-width: 63.99em)": Object {
          "opacity": 0.8,
        },
        "@media (min-width: 64em) and (max-width: 119.99em)": Object {
          "display": "none",
        },
      },
      "field": Object {
        "@media (max-width: 39.99em)": Object {
          "bg": "purple.200",
          "color": "purple.800",
        },
        "@media (min-width: 120em)": Object {
          "borderColor": "gray.300",
          "borderWidth": 1,
        },
        "@media (min-width: 40em) and (max-width: 63.99em)": Object {
          "borderColor": "gray.300",
          "borderWidth": 1,
        },
        "@media (min-width: 64em) and (max-width: 119.99em)": Object {
          "textDecoration": "underline",
        },
      },
    }
  `)
})
