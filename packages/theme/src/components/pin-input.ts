import { styleConfig } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const baseStyle = {
  ...inputStyles.baseStyle?.field,
  textAlign: "center",
}

const sizes = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm",
  },
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

const defaultProps = inputStyles.defaultProps

const pinInput = styleConfig({
  baseStyle,
  sizes,
  variants,
  // @ts-ignore
  defaultProps,
})

export default pinInput
