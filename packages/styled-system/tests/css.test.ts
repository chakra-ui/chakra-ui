import { createBreakpoints } from "@chakra-ui/theme-tools"
import { css } from "../src/css"

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

const theme = {
  breakpoints,
  colors: {
    red: {
      500: "#ff0000",
    },
    primary: "tomato",
    secondary: "cyan",
  },
  fontSizes: [12, 14, 16, 24, 36],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    monospace: "Menlo, monospace",
  },
  lineHeights: {
    body: 1.5,
  },
  fontWeights: {
    bold: 600,
  },
  sizes: {
    small: 4,
    medium: 8,
    large: 16,
    sidebar: 320,
  },
  buttons: {
    primary: {
      p: 3,
      fontWeight: "bold",
      color: "white",
      bg: "primary",
      borderRadius: 2,
    },
  },
  text: {
    caps: {
      fontSize: [1, 2],
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    title: {
      fontSize: [3, 4],
      letterSpacing: ["-0.01em", "-0.02em"],
    },
  },
  borderWidths: {
    thin: 1,
  },
  borderStyles: {
    thick: "solid",
  },
  radii: {
    small: 5,
  },
  textTransform: {
    header: "uppercase",
  },
}

test("returns system props styles", () => {
  const result = css({
    color: "primary",
    fontSize: [2, 3, 4],
  })({ theme })

  expect(result).toEqual({
    fontSize: 16,
    "@media screen and (min-width: 40em)": {
      fontSize: 24,
    },
    "@media screen and (min-width: 52em)": {
      fontSize: 36,
    },
    color: "tomato",
  })
})

test("returns nested system props styles", () => {
  const result = css({
    color: "primary",
    "&:hover": {
      color: "secondary",
    },
  })({ theme })
  expect(result).toEqual({
    color: "tomato",
    "&:hover": {
      color: "cyan",
    },
  })
})

test("returns nested responsive styles", () => {
  const result = css({
    color: "primary",
    h1: {
      py: [3, 4],
    },
  })({ theme })
  expect(result).toEqual({
    color: "tomato",
    h1: {
      paddingTop: 16,
      paddingBottom: 16,
      "@media screen and (min-width: 40em)": {
        paddingTop: 32,
        paddingBottom: 32,
      },
    },
  })
})

test("handles all core styled system props", () => {
  const result = css({
    m: 0,
    mb: 2,
    mx: "auto",
    p: 3,
    py: 4,
    fontSize: 3,
    fontWeight: "bold",
    color: "primary",
    bg: "secondary",
    fontFamily: "monospace",
    lineHeight: "body",
    textTransform: "header",
  })({ theme })
  expect(result).toEqual({
    margin: 0,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
    color: "tomato",
    background: "cyan",
    fontFamily: "Menlo, monospace",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: "uppercase",
  })
})

test("works with the css prop", () => {
  const result = css({
    color: "primary",
    m: 0,
    fontSize: 2,
  })(theme)
  expect(result).toEqual({
    color: "tomato",
    margin: 0,
    fontSize: 16,
  })
})

test("works with functional arguments", () => {
  const result = css((t: any) => ({
    color: t.colors.primary,
  }))(theme)
  expect(result).toEqual({
    color: "tomato",
  })
})

test("supports functional values", () => {
  const result = css({
    color: (t: any) => t.colors.primary,
  })(theme)
  expect(result).toEqual({
    color: "tomato",
  })
})

test("returns variants from theme", () => {
  const result = css({
    apply: "buttons.primary",
  })(theme)
  expect(result).toEqual({
    padding: 16,
    fontWeight: 600,
    color: "white",
    background: "tomato",
    borderRadius: 2,
  })
})

test("handles variants with responsive values", () => {
  const result = css({
    apply: "text.caps",
  })(theme)
  expect(result).toEqual({
    fontSize: 14,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    "@media screen and (min-width: 40em)": {
      fontSize: 16,
    },
  })
})

test("handles responsive variants", () => {
  const result = css({
    apply: "text.title",
  })(theme)
  expect(result).toEqual({
    fontSize: 24,
    letterSpacing: "-0.01em",
    "@media screen and (min-width: 40em)": {
      fontSize: 36,
      letterSpacing: "-0.02em",
    },
  })
})

test("handles negative margins from scale", () => {
  const result = css({
    mt: -3,
    mx: -4,
  })(theme)
  expect(result).toEqual({
    marginTop: -16,
    marginLeft: -32,
    marginRight: -32,
  })
})

test("handles negative values from custom css var scale", () => {
  const customTheme = {
    ...theme,
    space: ["var(--size-0)", "var(--size-1)", "var(--size-2)", "var(--size-3)"],
  }
  const result = css({
    mt: -1,
    mx: -2,
    top: -3,
    right: -3,
    bottom: -3,
    left: -3,
  })(customTheme)
  expect(result).toEqual({
    marginTop: `calc(var(--size-1) * -1)`,
    marginLeft: `calc(var(--size-2) * -1)`,
    marginRight: `calc(var(--size-2) * -1)`,
    top: `calc(var(--size-3) * -1)`,
    right: `calc(var(--size-3) * -1)`,
    bottom: `calc(var(--size-3) * -1)`,
    left: `calc(var(--size-3) * -1)`,
  })
})

test("handles negative top, left, bottom, and right from scale", () => {
  const result = css({
    top: -1,
    right: -4,
    bottom: -3,
    left: -2,
  })(theme)
  expect(result).toEqual({
    top: -4,
    right: -32,
    bottom: -16,
    left: -8,
  })
})

test("skip breakpoints", () => {
  const result = css({
    width: ["100%", null, "50%"],
  })(theme)
  expect(result).toEqual({
    width: "100%",
    "@media screen and (min-width: 40em)": {},
    "@media screen and (min-width: 52em)": {
      width: "50%",
    },
  })
})

test("padding shorthand does not collide with nested p selector", () => {
  const result = css({
    p: {
      fontSize: 32,
      color: "tomato",
      p: 2,
    },
    padding: 32,
  })(theme)
  expect(result).toEqual({
    p: {
      fontSize: 32,
      color: "tomato",
      padding: 8,
    },
    padding: 32,
  })
})

test("ignores array values longer than breakpoints", () => {
  // intentionally not using createBreakpoints here
  // because you cant just slice off it
  const customBreakpoints: any = ["0em", "32em", "40em"]
  customBreakpoints.base = customBreakpoints[0]
  customBreakpoints.sm = customBreakpoints[1]
  customBreakpoints.lg = customBreakpoints[2]

  const result = css({
    width: [32, 64, 128, 256, 512],
  })({
    breakpoints: customBreakpoints,
  })
  expect(result).toEqual({
    width: 32,
    "@media screen and (min-width: 32em)": {
      width: 64,
    },
    "@media screen and (min-width: 40em)": {
      width: 128,
    },
  })
})

test("functional values can return responsive arrays", () => {
  const result = css({
    color: (t: any) => [t.colors.primary, t.colors.secondary],
  })(theme)
  expect(result).toEqual({
    "@media screen and (min-width: 40em)": {
      color: "cyan",
    },
    color: "tomato",
  })
})

test("resolves color correctly", () => {
  const result = css({
    color: "red",
  })(theme)

  expect(result).toEqual({
    color: "red",
  })
})

test("returns individual border styles", () => {
  const result = css({
    borderTopWidth: "thin",
    borderTopColor: "primary",
    borderTopStyle: "thick",
    borderTopLeftRadius: "small",
    borderTopRightRadius: "small",
    borderBottomWidth: "thin",
    borderBottomColor: "primary",
    borderBottomStyle: "thick",
    borderBottomLeftRadius: "small",
    borderBottomRightRadius: "small",
    borderRightWidth: "thin",
    borderRightColor: "primary",
    borderRightStyle: "thick",
    borderLeftWidth: "thin",
    borderLeftColor: "primary",
    borderLeftStyle: "thick",
  })(theme)

  expect(result).toEqual({
    borderTopColor: "tomato",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: "tomato",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRightColor: "tomato",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderLeftColor: "tomato",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
  })
})

test("flexBasis uses theme.sizes", () => {
  const style = css({
    flexBasis: "sidebar",
  })(theme)
  expect(style).toEqual({
    flexBasis: 320,
  })
})

test("fill and stroke use theme.colors", () => {
  const style = css({
    fill: "primary",
    stroke: "secondary",
  })(theme)
  expect(style).toEqual({
    fill: "tomato",
    stroke: "cyan",
  })
})

test("multiples are transformed", () => {
  const style = css({
    marginX: 2,
    marginY: 2,
    paddingX: 2,
    paddingY: 2,
    width: "large",
  })(theme)
  expect(style).toEqual({
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    width: 16,
  })
})

test("returns outline color from theme", () => {
  const result = css({
    outlineColor: "primary",
  })(theme)
  expect(result).toEqual({
    outlineColor: "tomato",
  })
})

test("returns correct media query order", () => {
  const result = css({
    width: ["100%", null, "50%"],
    color: ["red", "green", "blue"],
  })(theme)
  const keys = Object.keys(result)
  expect(keys).toEqual([
    "width",
    "@media screen and (min-width: 40em)",
    "@media screen and (min-width: 52em)",
    "color",
  ])
  expect(result).toEqual({
    width: "100%",
    "@media screen and (min-width: 40em)": {
      color: "green",
    },
    "@media screen and (min-width: 52em)": {
      width: "50%",
      color: "blue",
    },
    color: "red",
  })
})

test("returns correct media query order 2", () => {
  const result = css({
    flexDirection: "column",
    justifyContent: [null, "flex-start", "flex-end"],
    color: "background",
    height: "100%",
    px: [2, 3, 4],
    py: 4,
  })(theme)
  const keys = Object.keys(result)
  expect(keys).toEqual([
    "flexDirection",
    "justifyContent",
    "@media screen and (min-width: 40em)",
    "@media screen and (min-width: 52em)",
    "color",
    "height",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
  ])
})

test("pseudo selectors are transformed", () => {
  const result = css({
    _before: {
      paddingBottom: 2,
      paddingLeft: [2, 3, 4],
      paddingRight: { base: 1, sm: 2 },
    },
  })(theme)
  expect(result).toEqual({
    "&::before": {
      "@media screen and (min-width: 40em)": {
        paddingLeft: 16,
        paddingRight: 8,
      },
      "@media screen and (min-width: 52em)": {
        paddingLeft: 32,
      },
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 4,
    },
  })
})

test("should expand textStyle and layerStyle", () => {
  const theme = {
    colors: { red: { 300: "#red" } },
    breakpoints: createBreakpoints({
      sm: "400px",
      md: "768px",
      lg: "1200px",
      xl: "1800px",
    }),
    layerStyles: {
      v1: {
        color: "red.300",
        bg: "tomato",
      },
    },
    textStyles: {
      caps: {
        textTransform: "uppercase",
        letterSpacing: "wide",
        fontSize: "lg",
      },
      lower: {
        textTransform: "lowercase",
        letterSpacing: "0.2px",
        fontSize: "sm",
      },
    },
  }

  expect(css({ layerStyle: "v1" })(theme)).toMatchInlineSnapshot(`
    Object {
      "background": "tomato",
      "color": "#red",
    }
  `)

  expect(css({ textStyle: "caps" })(theme)).toMatchInlineSnapshot(`
    Object {
      "fontSize": "lg",
      "letterSpacing": "wide",
      "textTransform": "uppercase",
    }
  `)

  expect(css({ textStyle: ["caps", "lower"] })(theme)).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 400px)": Object {
        "fontSize": "sm",
        "letterSpacing": "0.2px",
        "textTransform": "lowercase",
      },
      "fontSize": "lg",
      "letterSpacing": "wide",
      "textTransform": "uppercase",
    }
  `)
})
