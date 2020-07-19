import { multiStyleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const pinInput = multiStyleConfig({
  parts: {
    field: "the pin-input field",
  },
  baseStyle: input.baseStyle,
  sizes: {
    lg: {
      field: {
        fontSize: "lg",
        w: 12,
        h: 12,
        borderRadius: "md",
      },
    },
    md: {
      field: {
        fontSize: "md",
        w: 10,
        h: 10,
        borderRadius: "md",
      },
    },
    sm: {
      field: {
        fontSize: "sm",
        w: 8,
        h: 8,
        borderRadius: "sm",
      },
    },
  },
  variants: input.variants,
  defaultProps: input.defaultProps,
})

export default pinInput
