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
    paddingBottom: "1px",
    lineHeight: "normal",
  },
  icon: {
    color: "currentColor",
    fontSize: "1.25rem",
    _disabled: { opacity: 0.5 },
  },
}

const variants = input.variants
const defaultProps = input.defaultProps

const sizes = {
  sm: {
    field: {
      ...input.sizes.sm.field,
      paddingRight: "2rem",
    },
    addon: {
      ...input.sizes.sm.addon,
    },
  },
  md: {
    field: {
      ...input.sizes.md.field,
      paddingRight: "2rem",
    },
    addon: {
      ...input.sizes.md.addon,
    },
  },
  lg: {
    field: {
      ...input.sizes.lg.field,
      paddingRight: "2rem",
    },
    addon: {
      ...input.sizes.lg.addon,
    },
  },
}

const select = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default select
