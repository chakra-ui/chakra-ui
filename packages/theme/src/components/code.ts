import { BaseStyle } from "@chakra-ui/theme-tools"
import badge from "./badge"

const register = {
  parts: ["container"],
  variants: badge.register.variants,
} as const

const baseStyle: BaseStyle<typeof register> = {
  container: {
    fontFamily: "mono",
    fontSize: "sm",
    paddingX: "0.2em",
    borderRadius: "sm",
  },
}

const variants = badge.variants

const defaultProps = badge.defaultProps

const code = {
  register,
  defaultProps,
  baseStyle,
  variants,
}

export default code
