import { toCSSVar } from "@chakra-ui/styled-system"
import defaultTheme from "@chakra-ui/theme"
import { getStyleObject } from "../src/system"

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
  const result = getStyleObject({ baseStyle: { bgPosition: "center" } })({
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
    Object {
      "&:hover, &[data-hover]": Object {
        "&::before": Object {
          "content": "",
          "display": "block",
        },
        "@media screen and (min-width: 30em)": Object {
          "fontSize": "26px",
        },
        "background": "var(--colors-green-300)",
        "fontSize": "12px",
      },
      "--line-clamp": 3,
      "@media screen and (min-width: 30em)": Object {
        "--line-clamp": 4,
        "fontSize": "23px",
        "letterSpacing": "0.2px",
        "textTransform": "lowercase",
      },
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": "var(--line-clamp)",
      "background": "tomato",
      "backgroundPosition": "top left",
      "color": "var(--colors-red-300)",
      "display": "-webkit-box",
      "fontSize": "10px",
      "letterSpacing": "2px",
      "overflow": "hidden",
      "paddingLeft": 40,
      "paddingRight": "var(--space-5)",
      "textOverflow": "ellipsis",
      "textTransform": "uppercase",
    }
  `)
})

test("should override padding correctly", () => {
  const result = getStyleObject({})({
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
      "color": "var(--colors-green-300)",
      "marginRight": "var(--space-5)",
      "paddingLeft": "var(--space-4)",
      "paddingRight": "var(--space-3)",
    }
  `)
})
