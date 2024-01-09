import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"

const $bg = cssVar("tooltip-bg")
const $fg = cssVar("tooltip-fg")
const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = defineStyle({
  bg: $bg.reference,
  color: $fg.reference,
  [$bg.variable]: "colors.gray.700",
  [$fg.variable]: "colors.whiteAlpha.900",
  _dark: {
    [$bg.variable]: "colors.gray.300",
    [$fg.variable]: "colors.gray.900",
  },
  [$arrowBg.variable]: $bg.reference,
  px: "2",
  py: "0.5",
  borderRadius: "sm",
  fontWeight: "medium",
  fontSize: "sm",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip",
})

export const tooltipTheme = defineStyleConfig({
  baseStyle,
})
