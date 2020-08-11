import { mode } from "@chakra-ui/theme-tools"

const baseStyle = function (props: Record<string, any>) {
  const hoverBg = mode(`blackAlpha.100`, `whiteAlpha.100`)(props)
  const activeBg = mode(`blackAlpha.200`, `whiteAlpha.200`)(props)

  return {
    borderRadius: "md",
    transition: "all 0.2s",
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

const sizes = {
  lg: {
    w: "40px",
    h: "40px",
    fontSize: "16px",
  },
  md: {
    w: "32px",
    h: "32px",
    fontSize: "12px",
  },
  sm: {
    w: "24px",
    h: "24px",
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
