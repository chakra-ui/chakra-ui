import { styleConfig } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const baseStyle = {
  ...inputStyles.baseStyle?.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

// @ts-ignore
const variantOutline = (props) => inputStyles.variantOutline(props)?.field ?? {}

// @ts-ignore
const variantFlushed = (props) => inputStyles.variantFlushed(props)?.field ?? {}

// @ts-ignore
const variantFilled = (props) => inputStyles.variantFilled(props).field ?? {}

const variantUnstyled = inputStyles.variantUnstyled.field

const variants = {
  outline: variantOutline,
  flushed: variantFlushed,
  filled: variantFilled,
  unstyled: variantUnstyled,
}

const sizes = {
  sm: inputStyles.sizes?.sm.field,
  md: inputStyles.sizes?.md.field,
  lg: inputStyles.sizes?.lg.field,
}

const defaultProps = {
  size: "md",
  variant: "outline",
}

const textarea = styleConfig({
  baseStyle,
  sizes,
  variants,
  // @ts-ignore
  defaultProps,
})

export const textareaStyles = {
  baseStyle,
  sizes,
  variantFilled,
  variantFlushed,
  variantOutline,
  defaultProps,
}

export default textarea
