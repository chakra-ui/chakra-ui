import type { SystemStyleObject } from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyle: SystemStyleObject = {
  borderRadius: "md",
  borderWidth: "1px",
  borderBottomWidth: "3px",
  fontSize: "0.8em",
  fontWeight: "bold",
  lineHeight: "normal",
  px: "0.4em",
  whiteSpace: "nowrap",

  _light: {
    bg: "gray.100",
  },

  _dark: {
    bg: "whiteAlpha",
  },
}

export default {
  baseStyle,
}
