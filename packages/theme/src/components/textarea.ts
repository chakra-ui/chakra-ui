import { styleConfig } from "@chakra-ui/theme-tools"
import input from "./input"

const textarea = styleConfig({
  baseStyle: {
    ...input.baseStyle?.field,
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
  sizes: {
    sm: input.sizes?.sm.field,
    md: input.sizes?.md.field,
    lg: input.sizes?.lg.field,
  },
  variants: {
    outline: (props) => input.variants?.outline(props)?.field ?? {},
    flushed: (props) => input.variants?.flushed(props)?.field ?? {},
    filled: (props) => input.variants?.filled(props).field ?? {},
    unstyled: input.variants?.unstyled.field,
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})

export default textarea
