import { styleResolver } from "../src/system"
import theme from "@chakra-ui/theme"

const customTheme: any = {
  ...theme,
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

test("should resolve styles correctly", () => {
  const result = styleResolver({ baseStyle: { bgPosition: "center" } })({
    theme: customTheme,
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
          "fontSize": 26,
        },
        "background": "#68D391",
        "fontSize": 12,
      },
      "@media screen and (min-width: 30em)": Object {
        "WebkitLineClamp": 4,
        "fontSize": 23,
        "letterSpacing": "0.2px",
        "textTransform": "lowercase",
      },
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": 3,
      "background": "tomato",
      "backgroundPosition": "top left",
      "color": "#F687B3",
      "display": "-webkit-box",
      "fontSize": 10,
      "letterSpacing": "2px",
      "overflow": "hidden",
      "paddingLeft": 40,
      "paddingRight": "1.25rem",
      "textOverflow": "ellipsis",
      "textTransform": "capitalize",
    }
  `)
})
