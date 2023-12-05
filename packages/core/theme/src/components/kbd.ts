import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"

const $bg = cssVar("kbd-bg")

const baseStyle = defineStyle({
  [$bg.variable]: "colors.gray.100",
  _dark: {
    [$bg.variable]: "colors.whiteAlpha.100",
  },
  bg: $bg.reference,
  borderRadius: "md",
  borderWidth: "1px",
  borderBottomWidth: "3px",
  fontSize: "0.8em",
  fontWeight: "bold",
  lineHeight: "normal",
  px: "0.4em",
  whiteSpace: "nowrap",
})

export const kbdTheme = defineStyleConfig({
  baseStyle,
})
