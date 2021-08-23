import type {
  StyleFunctionProps,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import Input from "./input"

const baseStyle: SystemStyleObject = {
  ...Input.baseStyle.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
  verticalAlign: "top",
}

const variants = {
  outline: (props: StyleFunctionProps) => Input.variants.outline(props).field,
  flushed: (props: StyleFunctionProps) => Input.variants.flushed(props).field,
  filled: (props: StyleFunctionProps) => Input.variants.filled(props).field,
  unstyled: Input.variants.unstyled.field,
}

const sizes = {
  xs: Input.sizes.xs.field,
  sm: Input.sizes.sm.field,
  md: Input.sizes.md.field,
  lg: Input.sizes.lg.field,
}

const defaultProps = {
  size: "md",
  variant: "outline",
}

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
