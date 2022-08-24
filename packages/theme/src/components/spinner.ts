import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"

const $size = cssVar("spinner-size")

const baseStyle = defineStyle({
  width: [$size.reference],
  height: [$size.reference],
})

const sizes = {
  xs: defineStyle({
    [$size.variable]: "0.75rem",
  }),
  sm: defineStyle({
    [$size.variable]: "1rem",
  }),
  md: defineStyle({
    [$size.variable]: "1.5rem",
  }),
  lg: defineStyle({
    [$size.variable]: "2rem",
  }),
  xl: defineStyle({
    [$size.variable]: "3rem",
  }),
}

export const spinnerTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
})
