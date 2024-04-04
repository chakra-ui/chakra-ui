import { defaultSystem } from "../src"

const { css } = defaultSystem

describe("css", () => {
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
        "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])": {
          "color": "pink !important",
        },
        "--bg": "var(--chakra-colors-pink-400)",
        "@media screen and (min-width: 30rem)": {
          "padding": "20px",
        },
        "@media screen and (min-width: 48rem)": {
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
        "@media screen and (min-width: 30rem)": {
          "fontSize": 3,
        },
        "@media screen and (min-width: 48rem)": {
          "fontSize": 4,
        },
        "color": "primary",
        "fontSize": 2,
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
          "color": "secondary",
        },
        "color": "primary",
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
          "@media screen and (min-width: 30rem)": {
            "paddingBlock": "var(--chakra-spacing-4)",
          },
          "paddingBlock": "var(--chakra-spacing-3)",
        },
        "color": "primary",
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
        "marginBlockStart": "calc(var(--chakra-spacing-3) * -1)",
        "marginInline": "calc(var(--chakra-spacing-4) * -1)",
      }
    `)
  })

  test("skip breakpoints", () => {
    const result = css({
      width: ["100%", null, "50%"],
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@media screen and (min-width: 48rem)": {
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
          "@media screen and (min-width: 30rem)": {
            "paddingLeft": "var(--chakra-spacing-3)",
            "paddingRight": "var(--chakra-spacing-2)",
          },
          "@media screen and (min-width: 48rem)": {
            "paddingLeft": "var(--chakra-spacing-4)",
          },
          "paddingBottom": "var(--chakra-spacing-2)",
          "paddingLeft": "var(--chakra-spacing-2)",
          "paddingRight": "var(--chakra-spacing-1)",
        },
      }
    `)
  })

  test("responsive text styles", () => {
    const result = css({
      textStyle: ["sm", "lg"],
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@media screen and (min-width: 30rem)": {
          "fontSize": "var(--chakra-font-sizes-lg)",
          "lineHeight": "1.5",
        },
        "fontSize": "var(--chakra-font-sizes-sm)",
        "lineHeight": "1.5",
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

  test("expand css var token", () => {
    const result = css({
      "--banner-height": "sizes.small",
      "--checkbox-disabled-color": "colors.red.300",
      "&:disabled": {
        color: "var(--checkbox-disabled-color)",
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "&:disabled": {
          "color": "var(--checkbox-disabled-color)",
        },
        "--banner-height": "sizes.small",
        "--checkbox-disabled-color": "var(--chakra-colors-red-300)",
      }
    `)
  })

  test("expand responsive css var token", () => {
    const result = css({
      "--checkbox-disabled-color": ["colors.pinkish", "colors.redish"],
      "&:disabled": {
        color: "var(--checkbox-disabled-color)",
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "&:disabled": {
          "color": "var(--checkbox-disabled-color)",
        },
        "--checkbox-disabled-color": "colors.pinkish",
        "@media screen and (min-width: 30rem)": {
          "--checkbox-disabled-color": "colors.redish",
        },
      }
    `)
  })

  test("resolve peer selectors", () => {
    const result = css({
      bg: "red.300",
      _peerChecked: {
        bg: "transparent",
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        ".peer:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) ~ &": {
          "background": "var(--chakra-colors-transparent)",
        },
        "background": "var(--chakra-colors-red-300)",
      }
    `)
  })

  test("color mix", () => {
    const result = css({
      bg: "red.300/30",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "--mix-background": "color-mix(in srgb, var(--chakra-colors-red-300) 30%, transparent)",
        "background": "var(--mix-background, var(--chakra-colors-red-300))",
      }
    `)
  })

  test("color mix", () => {
    const result = css({
      bg: "red.300/30",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "--mix-background": "color-mix(in srgb, var(--chakra-colors-red-300) 30%, transparent)",
        "background": "var(--mix-background, var(--chakra-colors-red-300))",
      }
    `)
  })

  test("color palette", () => {
    const result = css({
      bg: "colorPalette.300",
      colorPalette: "red",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "--chakra-colors-color-palette-100": "var(--chakra-colors-red-100)",
        "--chakra-colors-color-palette-200": "var(--chakra-colors-red-200)",
        "--chakra-colors-color-palette-300": "var(--chakra-colors-red-300)",
        "--chakra-colors-color-palette-400": "var(--chakra-colors-red-400)",
        "--chakra-colors-color-palette-50": "var(--chakra-colors-red-50)",
        "--chakra-colors-color-palette-500": "var(--chakra-colors-red-500)",
        "--chakra-colors-color-palette-600": "var(--chakra-colors-red-600)",
        "--chakra-colors-color-palette-700": "var(--chakra-colors-red-700)",
        "--chakra-colors-color-palette-800": "var(--chakra-colors-red-800)",
        "--chakra-colors-color-palette-900": "var(--chakra-colors-red-900)",
        "--chakra-colors-color-palette-950": "var(--chakra-colors-red-950)",
        "background": "var(--chakra-colors-color-palette-300)",
      }
    `)
  })

  test("token reference", () => {
    const result = css({
      border: {
        base: "1px solid {colors.primary}",
        _dark: "2px solid {colors.green.300}",
      },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        " &.dark, .dark &": {
          "border": "2px solid var(--chakra-colors-green-300)",
        },
        "border": "1px solid var(--colors.primary)",
      }
    `)
  })

  test("width and height", () => {
    const result = css({
      "--size": "sizes.3",
      w: "3",
      h: "3",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "--size": "var(--chakra-sizes-3)",
        "height": "var(--chakra-sizes-3)",
        "width": "var(--chakra-sizes-3)",
      }
    `)
  })

  test("should expand hideFrom and showFrom", () => {
    const result = css({
      hideFrom: "md",
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "@media screen and (min-width: 48rem)": {
          "display": "none",
        },
      }
    `)

    const result2 = css({
      hideBelow: "md",
    })

    expect(result2).toMatchInlineSnapshot(`
      {
        "@media screen and (max-width: 47.9975rem)": {
          "display": "none",
        },
      }
    `)
  })
})
