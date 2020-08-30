import Input from "./input"

type Dict = Record<string, any>

const baseStyle = {
  ...Input.baseStyle.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variants = {
  outline: (props: Dict) => Input.variants.outline(props).field,
  flushed: (props: Dict) => Input.variants.flushed(props).field,
  filled: (props: Dict) => Input.variants.filled(props).field,
  unstyled: Input.variants.unstyled.field,
}

const sizes = {
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
