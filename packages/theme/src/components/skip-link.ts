import type { SystemStyleObject } from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyle: SystemStyleObject = {
  borderRadius: "md",
  fontWeight: "semibold",
  _focus: {
    boxShadow: "outline",
    padding: "1rem",
    position: "fixed",
    top: "1.5rem",
    insetStart: "1.5rem",

    _light: {
      bg: "white",
    },

    _dark: {
      bg: "gray.700",
    },
  },
}

export default {
  baseStyle,
}
