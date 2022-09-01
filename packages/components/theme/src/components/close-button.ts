import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar, mode } from "@chakra-ui/theme-tools"

const $size = cssVar("close-button-size")

const baseStyle = defineStyle((props) => {
  const hoverBg = mode(`blackAlpha.100`, `whiteAlpha.100`)(props)
  const activeBg = mode(`blackAlpha.200`, `whiteAlpha.200`)(props)

  return {
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
    _hover: { bg: hoverBg },
    _active: { bg: activeBg },
    _focusVisible: {
      boxShadow: "outline",
    },
  }
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
