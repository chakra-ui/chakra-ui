import type { SystemStyleObject } from "@chakra-ui/theme-tools"

const baseStyle: SystemStyleObject = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline",
  },
  _focus: {
    boxShadow: "outline",
  },
}

export default {
  baseStyle,
}
