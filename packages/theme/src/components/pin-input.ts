import input from "./input"
type Dict = Record<string, any>

const baseStyle = {
  ...input.baseStyle.field,
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
  outline: (props: Dict) => input.variants.outline(props).field,
  flushed: (props: Dict) => input.variants.flushed(props).field,
  filled: (props: Dict) => input.variants.filled(props).field,
  unstyled: input.variants.unstyled.field,
}

const defaultProps = input.defaultProps

const pinInput = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default pinInput
