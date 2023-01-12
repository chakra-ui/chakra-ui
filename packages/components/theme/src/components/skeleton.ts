import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

const baseStyle = defineStyle({
  [$startColor.variable]: "colors.gray.100",
  [$endColor.variable]: "colors.gray.400",
  _dark: {
    [$startColor.variable]: "colors.gray.800",
    [$endColor.variable]: "colors.gray.600",
  },
  background: $startColor.reference,
  borderColor: $endColor.reference,
  opacity: 0.7,
  borderRadius: "sm",
})

export const skeletonTheme = defineStyleConfig({
  baseStyle,
})
