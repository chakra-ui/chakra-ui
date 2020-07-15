import { BaseStyle } from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["field"],
  variants: input.register.variants,
  sizes: input.register.sizes,
} as const

const baseStyle: BaseStyle<typeof register> = {
  field: {
    ...input.baseStyle.field,
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
}

const textarea = {
  ...input,
  register,
  baseStyle,
}

export default textarea
