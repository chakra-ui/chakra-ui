import { mode, cssVar, SystemStyleFunction } from "@chakra-ui/theme-tools"

const tooltipBg = cssVar("tooltip-bg")
const arrowBg = cssVar("popper-arrow-bg")

const baseStyle: SystemStyleFunction = (props) => {
  const bg = mode("gray.700", "gray.300")(props)
  return {
    [tooltipBg.variable]: `colors.${bg}`,
    px: "8px",
    py: "2px",
    bg: [tooltipBg.reference],
    [arrowBg.variable]: [tooltipBg.reference],
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  }
}

export default {
  baseStyle,
}
