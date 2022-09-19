import { breadcrumbAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleLink = defineStyle({
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

const baseStyleList = defineStyle({
  display: "flex",
  alignItems: "center",
})

const baseStyle = definePartsStyle({
  link: baseStyleLink,
  list: baseStyleList,
})

export const breadcrumbTheme = defineMultiStyleConfig({
  baseStyle,
})
