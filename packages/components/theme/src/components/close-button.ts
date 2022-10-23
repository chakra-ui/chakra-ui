import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"

const $size = cssVar("close-button-size")
const $bg = cssVar("close-button-bg")

const baseStyle = defineStyle({
  w: [$size.reference],
  h: [$size.reference],
  borderRadius: "md",
  transitionProperty: "common",
  transitionDuration: "normal",
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    [$bg.variable]: "colors.blackAlpha.100",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.100",
    },
  },
  _active: {
    [$bg.variable]: "colors.blackAlpha.200",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.200",
    },
  },
  _focusVisible: {
    boxShadow: "outline",
  },
  bg: $bg.reference,
})

const sizes = {
  lg: defineStyle({
    [$size.variable]: "sizes.10",
    fontSize: "md",
  }),
  md: defineStyle({
    [$size.variable]: "sizes.8",
    fontSize: "xs",
  }),
  sm: defineStyle({
    [$size.variable]: "sizes.6",
    fontSize: "2xs",
  }),
}

export const closeButtonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
})
