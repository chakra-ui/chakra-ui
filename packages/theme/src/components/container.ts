import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  w: "100%",
  mx: "auto",
  maxW: "60ch",
  px: "1rem",
})

export const containerTheme = defineStyleConfig({
  baseStyle,
})
