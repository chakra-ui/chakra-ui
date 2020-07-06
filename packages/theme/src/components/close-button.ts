import { BaseStyle, DefaultProps, mode, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["icon", "container"],
  sizes: ["sm", "md", "lg"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    icon: {},
    container: {
      borderRadius: "md",
      transition: "all 0.2s",
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none",
      },
      _hover: {
        bg: mode(`blackAlpha.100`, `whiteAlpha.100`)(props),
      },
      _active: {
        bg: mode(`blackAlpha.200`, `whiteAlpha.200`)(props),
      },
      _focus: {
        boxShadow: "outline",
      },
    },
  }
}

const sizes: Sizes<typeof register> = {
  lg: {
    container: { width: "40px", height: "40px" },
    icon: { fontSize: "16px" },
  },
  md: {
    container: { width: "32px", height: "32px" },
    icon: { fontSize: "12px" },
  },
  sm: {
    container: { width: "24px", height: "24px" },
    icon: { fontSize: "10px" },
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const closeButton = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default closeButton
