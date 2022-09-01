import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar, mode } from "@chakra-ui/theme-tools"

const $bg = cssVar("tooltip-bg")
const $fg = cssVar("tooltip-fg")
const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = defineStyle((props) => {
  const bg = mode("gray.700", "gray.300")(props)
  const fg = mode("whiteAlpha.900", "gray.900")(props)
  return {
    bg: $bg.reference,
    color: $fg.reference,
    [$bg.variable]: `colors.${bg}`,
    [$fg.variable]: `colors.${fg}`,
    [$arrowBg.variable]: $bg.reference,
    px: "2",
    py: "0.5",
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "xs",
    zIndex: "tooltip",
  }
})

export const tooltipTheme = defineStyleConfig({
  baseStyle,
})
