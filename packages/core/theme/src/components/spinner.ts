import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"

const $size = cssVar("spinner-size")

const baseStyle = defineStyle({
  width: [$size.reference],
  height: [$size.reference],
})

const sizes = {
  xs: defineStyle({
    [$size.variable]: "sizes.3",
  }),
  sm: defineStyle({
    [$size.variable]: "sizes.4",
  }),
  md: defineStyle({
    [$size.variable]: "sizes.6",
  }),
  lg: defineStyle({
    [$size.variable]: "sizes.8",
  }),
  xl: defineStyle({
    [$size.variable]: "sizes.12",
  }),
}

export const spinnerTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
})
