import Input from "./Input"

const PinInput = {
  baseStyle: Input.baseStyle,
  variant: Input.variant,
  variantSize: {
    __default: "md",
    lg: {
      fontSize: "lg",
      width: 12,
      height: 12,
      borderRadius: "md",
    },
    md: {
      fontSize: "md",
      width: 10,
      height: 10,
      borderRadius: "md",
    },
    sm: {
      fontSize: "sm",
      width: 8,
      height: 8,
      borderRadius: "sm",
    },
  },
}

export default PinInput
