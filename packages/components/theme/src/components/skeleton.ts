import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"
import { getColor } from "@chakra-ui/theme-tools"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")
const $bg = cssVar("skeleton-background")
const $bc = cssVar("skeleton-border-color")

const baseStyle = defineStyle((props) => {
  const { startColor, endColor, theme } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  return {
    [$startColor.variable]: start || "colors.gray.100",
    [$endColor.variable]: end || "colors.gray.400",
    [$bc.variable]: "colors.gray.100",
    [$bg.variable]: "colors.gray.400",
    _dark: {
      [$startColor.variable]: start || "colors.gray.800",
      [$endColor.variable]: end || "colors.gray.600",
      [$bc.variable]: "colors.gray.800",
      [$bg.variable]: "colors.gray.600",
    },
    background: end || $bg.reference,
    borderColor: start || $bg.reference,
    opacity: 0.7,
    borderRadius: "2px",
  }
})

export const skeletonTheme = defineStyleConfig({
  baseStyle,
})
