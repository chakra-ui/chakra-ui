import { BaseStyle } from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "link", "separator"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  separator: {},
  link: {
    transition: "all 0.15s ease-out",
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
  },
}

const Breadcrumb = {
  register,
  baseStyle,
}

export default Breadcrumb
