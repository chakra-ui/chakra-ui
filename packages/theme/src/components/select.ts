import { styleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const select = styleConfig({
  parts: {
    field: "the select field itself",
    icon: "the select field icon",
  },
  baseStyle: {
    field: {
      ...input.baseStyle?.field,
      appearance: "none",
      paddingBottom: "1px",
      lineHeight: "normal",
    },
    icon: {
      color: "currentColor",
      fontSize: "1.25rem",
      _disabled: { opacity: 0.5 },
    },
  },

  sizes: input.sizes,
  variants: input.variants,
  defaultProps: input.defaultProps,
})

export default select
