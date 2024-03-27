import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  bg: "transparent",
  whiteSpace: "nowrap",
})

export const markTheme = defineStyleConfig({
  baseStyle,
})
