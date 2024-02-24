import {
  defineStyle,
  defineStyleConfig,
} from "../../../components/src/styled-system"

const baseStyle = defineStyle({
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
  _focusVisible: {
    boxShadow: "outline",
  },
})

export const linkTheme = defineStyleConfig({
  baseStyle,
})
