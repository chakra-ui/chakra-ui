import { toCSSVar } from "../src/create-theme-vars"
import { css } from "../src/css"

const theme = toCSSVar({
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
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
  transition: {
    duration: {
      slow: "1s",
    },
    easing: {
      smooth: "ease-in-out",
    },
    property: {
      common: "opacity, transform, background-color, color",
    },
  },
})

test("returns system props styles", () => {
  const result = css({
    color: "primary",
    fontSize: [2, 3, 4],
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "fontSize": "var(--fontSizes-3)",
      },
      "@media screen and (min-width: 52em)": Object {
        "fontSize": "var(--fontSizes-4)",
      },
      "color": "var(--colors-primary)",
      "fontSize": "var(--fontSizes-2)",
    }
  `)
})

test("returns nested system props styles", () => {
  const result = css({
    color: "primary",
    "&:hover": {
      color: "secondary",
    },
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "&:hover": Object {
        "color": "var(--colors-secondary)",
      },
      "color": "var(--colors-primary)",
    }
  `)
})

test("returns nested responsive styles", () => {
  const result = css({
    color: "primary",
    h1: {
      py: [3, 4],
    },
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "color": "var(--colors-primary)",
      "h1": Object {
        "@media screen and (min-width: 40em)": Object {
          "paddingBottom": "var(--space-4)",
          "paddingTop": "var(--space-4)",
        },
        "paddingBottom": "var(--space-3)",
        "paddingTop": "var(--space-3)",
      },
    }
  `)
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
    textTransform: "uppercase",
  })(theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "var(--colors-secondary)",
      "color": "var(--colors-primary)",
      "fontFamily": "var(--fonts-monospace)",
      "fontSize": "var(--fontSizes-3)",
      "fontWeight": "var(--fontWeights-bold)",
      "lineHeight": "var(--lineHeights-body)",
      "margin": "var(--space-0)",
      "marginBottom": "var(--space-2)",
      "marginInlineEnd": "auto",
      "marginInlineStart": "auto",
      "padding": "var(--space-3)",
      "paddingBottom": "var(--space-4)",
      "paddingTop": "var(--space-4)",
      "textTransform": "uppercase",
    }
  `)
})

test("works with the css prop", () => {
  const result = css({
    color: "primary",
    m: 0,
    fontSize: 2,
  })(theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "color": "var(--colors-primary)",
      "fontSize": "var(--fontSizes-2)",
      "margin": "var(--space-0)",
    }
  `)
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
  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "var(--colors-primary)",
      "borderRadius": "2px",
      "color": "white",
      "fontWeight": "var(--fontWeights-bold)",
      "padding": "var(--space-3)",
    }
  `)
})

test("handles variants with responsive values", () => {
  const result = css({
    apply: "text.caps",
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "fontSize": "var(--fontSizes-2)",
      },
      "fontSize": "var(--fontSizes-1)",
      "letterSpacing": "0.1em",
      "textTransform": "uppercase",
    }
  `)
})

test("handles responsive variants", () => {
  const result = css({
    apply: "text.title",
  })(theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "fontSize": "var(--fontSizes-4)",
        "letterSpacing": "-0.02em",
      },
      "fontSize": "var(--fontSizes-3)",
      "letterSpacing": "-0.01em",
    }
  `)
})

test("handles negative margins from scale", () => {
  const result = css({
    mt: -3,
    mx: -4,
  })(theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "marginInlineEnd": "calc(var(--space-4) * -1)",
      "marginInlineStart": "calc(var(--space-4) * -1)",
      "marginTop": "calc(var(--space-3) * -1)",
    }
  `)
})

test("handles negative values from custom css var scale", () => {
  const customTheme = toCSSVar({
    ...theme,
    space: ["var(--size-0)", "var(--size-1)", "var(--size-2)", "var(--size-3)"],
  })

  const result = css({
    mt: -1,
    mx: -2,
    top: -3,
    right: -3,
    bottom: -3,
    left: -3,
  })(customTheme)

  // Custom CSS variables are mapped to CSS vars controlled by chakra
  expect(result).toMatchInlineSnapshot(`
    Object {
      "bottom": "calc(var(--space-3) * -1)",
      "left": "calc(var(--space-3) * -1)",
      "marginInlineEnd": "calc(var(--space-2) * -1)",
      "marginInlineStart": "calc(var(--space-2) * -1)",
      "marginTop": "calc(var(--space-1) * -1)",
      "right": "calc(var(--space-3) * -1)",
      "top": "calc(var(--space-3) * -1)",
    }
  `)
})

test("handles negative top, left, bottom, and right from scale", () => {
  const result = css({
    top: -1,
    right: -4,
    bottom: -3,
    left: -2,
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "bottom": "calc(var(--space-3) * -1)",
      "left": "calc(var(--space-2) * -1)",
      "right": "calc(var(--space-4) * -1)",
      "top": "calc(var(--space-1) * -1)",
    }
  `)
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

  expect(result).toMatchInlineSnapshot(`
    Object {
      "p": Object {
        "color": "tomato",
        "fontSize": "32px",
        "padding": "var(--space-2)",
      },
      "padding": "32px",
    }
  `)
})

test("functional values can return responsive arrays", () => {
  const result = css({
    color: (t: any) => [t.colors.primary, t.colors.secondary],
  })(theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "color": "cyan",
      },
      "color": "tomato",
    }
  `)
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
  })(toCSSVar(theme))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "borderBottomColor": "var(--colors-primary)",
      "borderBottomLeftRadius": "var(--radii-small)",
      "borderBottomRightRadius": "var(--radii-small)",
      "borderBottomStyle": "var(--borderStyles-thick)",
      "borderBottomWidth": "var(--borderWidths-thin)",
      "borderLeftColor": "var(--colors-primary)",
      "borderLeftStyle": "var(--borderStyles-thick)",
      "borderLeftWidth": "var(--borderWidths-thin)",
      "borderRightColor": "var(--colors-primary)",
      "borderRightStyle": "var(--borderStyles-thick)",
      "borderRightWidth": "var(--borderWidths-thin)",
      "borderTopColor": "var(--colors-primary)",
      "borderTopLeftRadius": "var(--radii-small)",
      "borderTopRightRadius": "var(--radii-small)",
      "borderTopStyle": "var(--borderStyles-thick)",
      "borderTopWidth": "var(--borderWidths-thin)",
    }
  `)
})

test("flexBasis uses theme.sizes", () => {
  const style = css({
    flexBasis: "sidebar",
  })(toCSSVar(theme))
  expect(style).toMatchInlineSnapshot(`
    Object {
      "flexBasis": "var(--sizes-sidebar)",
    }
  `)
})

test("fill and stroke use theme.colors", () => {
  const style = css({
    fill: "primary",
    stroke: "secondary",
  })(theme)

  expect(style).toMatchInlineSnapshot(`
    Object {
      "fill": "var(--colors-primary)",
      "stroke": "var(--colors-secondary)",
    }
  `)
})

test("multiples are transformed", () => {
  const style = css({
    marginX: 2,
    marginY: 2,
    paddingX: 2,
    paddingY: 2,
    width: "large",
  })(theme)

  expect(style).toMatchInlineSnapshot(`
    Object {
      "marginBottom": "var(--space-2)",
      "marginInlineEnd": "var(--space-2)",
      "marginInlineStart": "var(--space-2)",
      "marginTop": "var(--space-2)",
      "paddingBottom": "var(--space-2)",
      "paddingInlineEnd": "var(--space-2)",
      "paddingInlineStart": "var(--space-2)",
      "paddingTop": "var(--space-2)",
      "width": "var(--sizes-large)",
    }
  `)
})

test("returns outline color from theme", () => {
  const result = css({
    outlineColor: "primary",
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "outlineColor": "var(--colors-primary)",
    }
  `)
})

test("returns correct media query order", () => {
  const result = css({
    width: ["100%", null, "50%"],
    color: ["red", "green", "blue"],
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "color": "green",
      },
      "@media screen and (min-width: 52em)": Object {
        "color": "blue",
        "width": "50%",
      },
      "color": "red",
      "width": "100%",
    }
  `)
})

test("returns correct media query 2nd order", () => {
  const result = css({
    flexDirection: "column",
    justifyContent: [null, "flex-start", "flex-end"],
    color: "background",
    height: "100%",
    px: [2, 3, 4],
    py: 4,
  })(theme)

  const keys = Object.keys(result)

  expect(keys).toMatchInlineSnapshot(`
    Array [
      "flexDirection",
      "justifyContent",
      "@media screen and (min-width: 40em)",
      "@media screen and (min-width: 52em)",
      "color",
      "height",
      "paddingInlineStart",
      "paddingInlineEnd",
      "paddingTop",
      "paddingBottom",
    ]
  `)
})

test("pseudo selectors are transformed", () => {
  const result = css({
    _before: {
      paddingBottom: 2,
      paddingLeft: [2, 3, 4],
      paddingRight: { base: 1, sm: 2 },
    },
  })(theme)

  expect(result).toMatchInlineSnapshot(`
    Object {
      "&::before": Object {
        "@media screen and (min-width: 40em)": Object {
          "paddingLeft": "var(--space-3)",
          "paddingRight": "var(--space-2)",
        },
        "@media screen and (min-width: 52em)": Object {
          "paddingLeft": "var(--space-4)",
        },
        "paddingBottom": "var(--space-2)",
        "paddingLeft": "var(--space-2)",
        "paddingRight": "var(--space-1)",
      },
    }
  `)
})

test("should expand textStyle and layerStyle", () => {
  const theme = toCSSVar({
    colors: { red: { 300: "#red" } },
    breakpoints: {
      sm: "400px",
      md: "768px",
      lg: "1200px",
      xl: "1800px",
    },
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
  })

  expect(css({ layerStyle: "v1" })(theme)).toMatchInlineSnapshot(`
    Object {
      "background": "tomato",
      "color": "var(--colors-red-300)",
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

test("transition tokens are replaced correctly", () => {
  expect(
    css({
      transitionProperty: "common",
      transitionDuration: "slow",
      transitionTimingFunction: "smooth",
    })(theme),
  ).toMatchInlineSnapshot(`
    Object {
      "transitionDuration": "var(--transition-duration-slow)",
      "transitionProperty": "var(--transition-property-common)",
      "transitionTimingFunction": "var(--transition-easing-smooth)",
    }
  `)
})

test("should resolve !important syntax", () => {
  expect(css({ background: "red.100!important" })(theme))
    .toMatchInlineSnapshot(`
    Object {
      "background": "red.100 !important",
    }
  `)
  expect(css({ background: "red.100!" })(theme)).toMatchInlineSnapshot(`
    Object {
      "background": "red.100 !important",
    }
  `)
  expect(css({ background: "#fff !important" })(theme)).toMatchInlineSnapshot(`
    Object {
      "background": "#fff !important",
    }
  `)
})
