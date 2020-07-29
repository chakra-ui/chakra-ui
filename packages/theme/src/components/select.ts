import { multiStyleConfig, mode } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const {
  sizes,
  defaultProps,
  variantFilled,
  variantFlushed,
  variantOutline,
  variantUnstyled,
} = inputStyles

const parts = {
  field: "the select field itself",
  icon: "the select field icon",
}

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

// @ts-ignore
const baseStyleField = function (props) {
  return {
    ...inputStyles.baseStyle?.field,
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option": {
      bg: mode("white", "gray.700")(props),
    },
  }
}

const baseStyleInput = {
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: { opacity: 0.5 },
}

// @ts-ignore
const baseStyle = (props) => ({
  field: baseStyleField(props),
  icon: baseStyleInput,
})

const select = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  variants,
  // @ts-ignore
  defaultProps,
})

export const selectStyles = {
  parts,
  baseStyleField,
  baseStyleInput,
  variantFilled,
  variantFlushed,
  variantOutline,
  variantUnstyled,
  defaultProps,
}

export default select
