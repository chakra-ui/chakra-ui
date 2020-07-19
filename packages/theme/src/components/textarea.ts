import { styleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const textarea = styleConfig({
  parts: {
    field: "the select field",
  },
  baseStyle: {
    field: {
      ...input.baseStyle?.field,
      paddingY: "8px",
      minHeight: "80px",
      lineHeight: "short",
    },
  },
  sizes: input.sizes,
  variants: input.variants,
  defaultProps: input.defaultProps,
})

export default textarea
