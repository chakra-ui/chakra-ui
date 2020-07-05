import { BaseStyle } from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "item", "button", "panel"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  item: {
    borderTopWidth: "1px",
    borderColor: "inherit",
    _last: {
      borderBottomWidth: "1px",
    },
  },
  button: {
    fontSize: "1rem",
    _focus: { boxShadow: "outline" },
    _hover: { bg: "blackAlpha.50" },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
    paddingX: 4,
    paddingY: 2,
  },
  panel: {
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 5,
  },
}

const accordion = {
  register,
  baseStyle,
}

export default accordion
