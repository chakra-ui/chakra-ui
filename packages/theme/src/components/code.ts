import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { badgeTheme } from "./badge"

const { variants, defaultProps } = badgeTheme

const baseStyle = defineStyle({
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm",
})

export const codeTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps,
})
