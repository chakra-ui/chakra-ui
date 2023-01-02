import { toCSSVar } from "@chakra-ui/styled-system"
import defaultTheme from "@chakra-ui/theme"
import { toCSSObject } from "../src/system"

const theme = toCSSVar({
  ...defaultTheme,
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

test("should resolve styles correctly", () => {
  const result = toCSSObject({ baseStyle: { bgPosition: "center" } })({
    theme,
    layerStyle: "v1",
    noOfLines: [3, 4],
    __css: {
      px: 4,
      color: "green.300",
    },
    css: {
      paddingLeft: 40,
    },
    color: "pink.300",
    px: 5,
    textTransform: "capitalize",
    apply: { base: "textStyles.caps", sm: "textStyles.lower" },
    sx: {
      letterSpacing: "2px",
    },
    letterSpacing: ["8px", "50px"],
    fontSize: [10, 23],
    backgroundPosition: "top left",
    _hover: {
      bg: "green.300",
      fontSize: [12, 26],
      _before: {
        content: "",
        display: "block",
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "&:hover, &[data-hover]": Object {
          "&::before": Object {
            "content": "",
            "display": "block",
          },
          "@media screen and (min-width: 30em)": Object {
            "fontSize": "26px",
          },
          "background": "var(--chakra-colors-green-300)",
          "fontSize": "12px",
        },
        "--chakra-line-clamp": 3,
        "@media screen and (min-width: 30em)": Object {
          "--chakra-line-clamp": 4,
          "fontSize": "23px",
          "letterSpacing": "0.2px",
          "textTransform": "lowercase",
        },
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "var(--chakra-line-clamp)",
        "background": "tomato",
        "backgroundPosition": "top left",
        "color": "var(--chakra-colors-pink-300)",
        "display": "-webkit-box",
        "fontSize": "10px",
        "letterSpacing": "2px",
        "overflow": "hidden",
        "paddingInlineEnd": "var(--chakra-space-5)",
        "paddingInlineStart": "var(--chakra-space-5)",
        "textOverflow": "ellipsis",
        "textTransform": "capitalize",
      },
      Object {
        "paddingLeft": 40,
      },
    ]
  `)
})
test("should resolve styles correctly", () => {
  const result = toCSSObject({ baseStyle: (props) => ({ bg: props.color }) })({
    theme,
    color: "pink.300",
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "var(--chakra-colors-pink-300)",
      "color": "var(--chakra-colors-pink-300)",
    }
  `)
})

test("should override padding correctly", () => {
  const result = toCSSObject({})({
    theme,
    __css: {
      paddingX: 4,
      color: "green.300",
    },
    paddingRight: 3,
    mr: "5",
    bg: "pinkish",
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "pinkish",
      "color": "var(--chakra-colors-green-300)",
      "marginRight": "var(--chakra-space-5)",
      "paddingInlineEnd": "var(--chakra-space-4)",
      "paddingInlineStart": "var(--chakra-space-4)",
      "paddingRight": "var(--chakra-space-3)",
    }
  `)
})

test("should respect priority order", () => {
  const result = toCSSObject({})({
    theme,
    __css: {
      px: 4,
      padding: 0,
    },
    px: 8,
  })

  expect(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
    "{
      \\"padding\\": \\"0px\\",
      \\"paddingInlineStart\\": \\"var(--chakra-space-8)\\",
      \\"paddingInlineEnd\\": \\"var(--chakra-space-8)\\"
    }"
  `)
})
