import type { SystemStyleObject } from "@chakra-ui/theme-tools"
import { cssVar } from "@chakra-ui/theme-tools"

const $size = cssVar("close-button-size")

const baseStyle: SystemStyleObject = {
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
    _light: {
      bg: `blackAlpha.100`,
    },

    _dark: {
      bg: `whiteAlpha.100`,
    },
  },
  _active: {
    _light: {
      bg: `blackAlpha.200`,
    },

    _dark: {
      bg: `whiteAlpha.200`,
    },
  },
  _focus: {
    boxShadow: "outline",
  },
}

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    [$size.variable]: "40px",
    fontSize: "16px",
  },
  md: {
    [$size.variable]: "32px",
    fontSize: "12px",
  },
  sm: {
    [$size.variable]: "24px",
    fontSize: "10px",
  },
}

const defaultProps = {
  size: "md",
}

export default {
  baseStyle,
  sizes,
  defaultProps,
}
