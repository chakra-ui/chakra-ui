import input from "./input"

type Dict = Record<string, any>

const baseStyle = {
  ...input.baseStyle.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variants = {
  outline: (props: Dict) => input.variants.outline(props).field,
  flushed: (props: Dict) => input.variants.flushed(props).field,
  filled: (props: Dict) => input.variants.filled(props).field,
  unstyled: input.variants.unstyled.field,
}

const sizes = {
  sm: input.sizes.sm.field,
  md: input.sizes.md.field,
  lg: input.sizes.lg.field,
}

const defaultProps = {
  size: "md",
  variant: "outline",
}

const textarea = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default textarea
