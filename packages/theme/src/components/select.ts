import { BaseStyle, Sizes } from "@chakra-ui/theme-tools"
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
    paddingBottom: "1px",
    lineHeight: "normal",
  },
  icon: {
    color: "currentColor",
    fontSize: "1.25rem",
    _disabled: { opacity: 0.5 },
  },
}

const sizes: Sizes<typeof register> = {
  sm: {
    field: { ...input.sizes.sm, paddingRight: "2rem" },
  },
  md: {
    field: { ...input.sizes.md, paddingRight: "2rem" },
  },
  lg: {
    field: { ...input.sizes.lg, paddingRight: "2rem" },
  },
}
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
