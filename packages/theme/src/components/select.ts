import { BaseStyle } from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["field", "icon"],
  sizes: input.register.sizes,
  variants: input.register.variants,
} as const

const baseStyle: BaseStyle<typeof register> = {
  field: {
    ...input.baseStyle.field,
    appearance: "none",
    paddingRight: "2rem",
    paddingBottom: "1px",
    lineHeight: "normal",
  },
  icon: {
    color: "currentColor",
    fontSize: "1.25rem",
    _disabled: { opacity: 0.5 },
  },
}

const sizes = input.sizes
const variants = input.variants
const defaultProps = input.defaultProps

const select = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default select
