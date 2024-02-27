import { presetBase } from "./preset-base"
import { createSystem } from "./system"

const { css } = createSystem({
  ...presetBase,
  theme: {
    breakpoints: {
      sm: "@media (min-width: 40em)",
      md: "@media (min-width: 52em)",
      lg: "@media (min-width: 64em)",
      xl: "@media (min-width: 80em)",
    },
    tokens: {
      colors: {
        red: { 300: { value: "#red300" } },
        pink: { 400: { value: "#pink400" } },
        primary: { value: "tomato" },
        secondary: { value: "cyan" },
      },
      fontSizes: {
        0: { value: "12px" },
        1: { value: "14px" },
        2: { value: "16px" },
        3: { value: "24px" },
        4: { value: "36px" },
      },
      spacing: {
        0: { value: "0" },
        1: { value: "4px" },
        2: { value: "8px" },
        3: { value: "16px" },
        4: { value: "32px" },
        5: { value: "64px" },
        6: { value: "128px" },
        7: { value: "256px" },
        8: { value: "512px" },
      },
      sizes: {
        small: { value: "4px" },
        medium: { value: "8px" },
        large: { value: "16px" },
        sidebar: { value: "320px" },
      },
    },
    semanticTokens: {},
    layerStyles: {
      v1: {
        value: {
          color: "red.300",
          bg: "tomato",
        },
      },
    },
    textStyles: {
      caps: {
        value: {
          textTransform: "uppercase",
          letterSpacing: "wide",
          fontSize: "lg",
        },
      },
      lower: {
        value: {
          textTransform: "lowercase",
          letterSpacing: "0.2px",
          fontSize: "sm",
        },
      },
    },
  },
})

describe("create css", () => {
  test("works", () => {
    expect(
      css({
        "--bg": "colors.pink.400",
        color: "red",
        _hover: { color: "pink!" },
        mt: { base: "40px", md: "20px" },
        padding: ["10px", "20px"],
      }),
    ).toMatchInlineSnapshot(`
      {
        "&:is(:hover, [data-hover])": {
          "color": "pink !important",
        },
        "--bg": "var(--colors-pink-400)",
        "@media (min-width: 40em)": {
          "padding": "20px",
        },
        "@media (min-width: 52em)": {
          "marginBlockStart": "20px",
        },
        "color": "red",
        "marginBlockStart": "40px",
        "padding": "10px",
      }
    `)
  })

  test("array syntax", () => {
    const result = css({
      color: "primary",
      fontSize: [2, 3, 4],
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@media (min-width: 40em)": {
          "fontSize": "var(--font-sizes-3)",
        },
        "@media (min-width: 52em)": {
          "fontSize": "var(--font-sizes-4)",
        },
        "color": "var(--colors-primary)",
        "fontSize": "var(--font-sizes-2)",
      }
    `)
  })

  test("native conditional", () => {
    const result = css({
      color: "primary",
      "&:hover": {
        color: "secondary",
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "&:hover": {
          "color": "var(--colors-secondary)",
        },
        "color": "var(--colors-primary)",
      }
    `)
  })

  test("nested responsive", () => {
    const result = css({
      color: "primary",
      "& h1": {
        py: [3, 4],
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "& h1": {
          "@media (min-width: 40em)": {
            "paddingBlock": "var(--spacing-4)",
          },
          "paddingBlock": "var(--spacing-3)",
        },
        "color": "var(--colors-primary)",
      }
    `)
  })

  test("handles negative margins", () => {
    const result = css({
      mt: -3,
      mx: -4,
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "marginBlockStart": "calc(var(--spacing-3) * -1)",
        "marginInline": "calc(var(--spacing-4) * -1)",
      }
    `)
  })

  test("skip breakpoints", () => {
    const result = css({
      width: ["100%", null, "50%"],
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@media (min-width: 52em)": {
          "width": "50%",
        },
        "width": "100%",
      }
    `)
  })

  test("pseudo selectors are transformed", () => {
    const result = css({
      _before: {
        paddingBottom: 2,
        paddingLeft: [2, 3, 4],
        paddingRight: { base: 1, sm: 2 },
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "&::before": {
          "@media (min-width: 40em)": {
            "paddingLeft": "var(--spacing-3)",
            "paddingRight": "var(--spacing-2)",
          },
          "@media (min-width: 52em)": {
            "paddingLeft": "var(--spacing-4)",
          },
          "paddingBottom": "var(--spacing-2)",
          "paddingLeft": "var(--spacing-2)",
          "paddingRight": "var(--spacing-1)",
        },
      }
    `)
  })

  test("layer styles", () => {
    const result = css({
      // @ts-expect-error
      layerStyle: "v1",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@layer compositions": {
          "background": "tomato",
          "color": "var(--colors-red-300)",
        },
      }
    `)
  })

  test("responsive text styles", () => {
    const result = css({
      textStyle: ["caps", "lower"],
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@layer compositions": {
          "fontSize": "lg",
          "letterSpacing": "wide",
          "textTransform": "uppercase",
        },
        "@media (min-width: 40em)": {
          "@layer compositions": {
            "fontSize": "sm",
            "letterSpacing": "0.2px",
            "textTransform": "lowercase",
          },
        },
      }
    `)
  })

  test("backdrop filter", () => {
    const result = css({
      backdropFilter: "auto",
      backdropHueRotate: "90",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "--backdrop-hue-rotate": "hue-rotate(90deg)",
        "backdropFilter": "var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia)",
      }
    `)
  })

  test("important syntax", () => {
    const result = css({
      background: "#fff!important",
      color: "#fff!",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "background": "#fff !important",
        "color": "#fff !important",
      }
    `)
  })
})
