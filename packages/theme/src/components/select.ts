import { multiStyleConfig, mode } from "@chakra-ui/theme-tools"
import input from "./input"

const select = multiStyleConfig({
  parts: {
    field: "the select field itself",
    icon: "the select field icon",
  },
  baseStyle: (props) => ({
    field: {
      ...input.baseStyle?.field,
      appearance: "none",
      paddingBottom: "1px",
      lineHeight: "normal",
      "> option": {
        bg: mode("white", "gray.700")(props),
      },
    },
    icon: {
      color: "currentColor",
      fontSize: "1.25rem",
      _disabled: { opacity: 0.5 },
    },
  }),

  sizes: input.sizes,
  variants: input.variants,
  defaultProps: input.defaultProps,
})

export default select
