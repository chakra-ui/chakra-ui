import { Sizes } from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["input"],
  sizes: input.register.sizes,
  variants: input.register.variants,
} as const

const baseStyle = input.baseStyle
const variants = input.variants

const sizes: Sizes<typeof register> = {
  lg: {
    input: {
      fontSize: "lg",
      width: 12,
      height: 12,
      borderRadius: "md",
    },
  },
  md: {
    input: {
      fontSize: "md",
      width: 10,
      height: 10,
      borderRadius: "md",
    },
  },
  sm: {
    input: {
      fontSize: "sm",
      width: 8,
      height: 8,
      borderRadius: "sm",
    },
  },
}

const defaultProps = input.defaultProps

const pinInput = {
  register,
  defaultProps,
  baseStyle,
  variants,
  sizes,
}

export default pinInput
