import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"
import { getColor, mode } from "@chakra-ui/theme-tools"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

const baseStyle = defineStyle((props) => {
  const defaultStartColor = mode("gray.100", "gray.800")(props)
  const defaultEndColor = mode("gray.400", "gray.600")(props)

  const {
    startColor = defaultStartColor,
    endColor = defaultEndColor,
    theme,
  } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  return {
    [$startColor.variable]: start,
    [$endColor.variable]: end,
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
  }
})

export const skeletonTheme = defineStyleConfig({
  baseStyle,
})
