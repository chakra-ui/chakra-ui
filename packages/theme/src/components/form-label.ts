import { BaseStyle } from "@chakra-ui/theme-tools"

const register = { parts: ["label"] } as const

const baseStyle: BaseStyle<typeof register> = {
  label: {
    fontSize: "md",
    marginRight: 3,
    marginBottom: 2,
    fontWeight: "medium",
    transition: "all 0.2s",
    opacity: 1,
    _disabled: {
      opacity: 0.4,
    },
  },
}

const label = {
  register,
  baseStyle,
}

export default label
