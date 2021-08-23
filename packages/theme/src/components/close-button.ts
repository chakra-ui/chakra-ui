import type {
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { cssVar, mode } from "@chakra-ui/theme-tools"

const btnSize = cssVar("close-button-size")

const baseStyle: SystemStyleFunction = (props) => {
  const hoverBg = mode(`blackAlpha.100`, `whiteAlpha.100`)(props)
  const activeBg = mode(`blackAlpha.200`, `whiteAlpha.200`)(props)

  return {
    w: [btnSize.reference],
    h: [btnSize.reference],
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
    _focus: {
      boxShadow: "outline",
    },
  }
}

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    [btnSize.variable]: "40px",
    fontSize: "16px",
  },
  md: {
    [btnSize.variable]: "32px",
    fontSize: "12px",
  },
  sm: {
    [btnSize.variable]: "24px",
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
