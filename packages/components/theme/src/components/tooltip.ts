import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar, mode } from "@chakra-ui/theme-tools"

const $bg = cssVar("tooltip-bg")
const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = defineStyle((props) => {
  const bg = mode("gray.700", "gray.300")(props)
  return {
    [$bg.variable]: `colors.${bg}`,
    px: "8px",
    py: "2px",
    bg: [$bg.reference],
    [$arrowBg.variable]: [$bg.reference],
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  }
})

export const tooltipTheme = defineStyleConfig({
  baseStyle,
})
