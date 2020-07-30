import { styleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const pinInput = styleConfig({
  baseStyle: {
    ...input.baseStyle?.field,
    textAlign: "center",
  },
  sizes: {
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
  },
  variants: {
    outline: (props) => input.variants?.outline(props)?.field ?? {},
    flushed: (props) => input.variants?.flushed(props)?.field ?? {},
    filled: (props) => input.variants?.filled(props).field ?? {},
    unstyled: input.variants?.unstyled.field,
  },
  defaultProps: input.defaultProps,
})

export default pinInput
