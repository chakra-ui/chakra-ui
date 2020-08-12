import { Input } from "./input"

const baseStyle = {
  ...Input.baseStyle?.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variants = {
  outline: (props: Record<string, any>) =>
    Input.variants?.outline(props)?.field ?? {},
  flushed: (props: Record<string, any>) =>
    Input.variants?.flushed(props)?.field ?? {},
  filled: (props: Record<string, any>) =>
    Input.variants?.filled(props).field ?? {},
  unstyled: Input.variants?.unstyled.field,
}

const sizes = {
  sm: Input.sizes?.sm.field,
  md: Input.sizes?.md.field,
  lg: Input.sizes?.lg.field,
}

const defaultProps = {
  size: "md",
  variant: "outline",
}

export const Textarea = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
