import { Input } from "./input"

const baseStyle = {
  ...Input.baseStyle?.field,
  textAlign: "center",
}

const sizes = {
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

const defaultProps = Input.defaultProps

export const PinInput = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
