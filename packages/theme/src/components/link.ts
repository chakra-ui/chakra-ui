import { BaseStyle } from "@chakra-ui/theme-tools"

const register = {
  parts: ["link"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  link: {
    transition: `all 0.15s ease-out`,
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    color: "inherit",
    _hover: {
      textDecoration: "underline",
    },
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      textDecoration: "none",
    },
  },
}

const link = {
  register,
  baseStyle,
}

export default link
