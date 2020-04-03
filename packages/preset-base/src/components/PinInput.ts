import Input, { InputProps } from "./Input"
import { ComponentTheme } from "./utils"

const PinInput: ComponentTheme<InputProps> = {
  defaultProps: Input.defaultProps,
  baseStyle: Input.baseStyle,
  variants: Input.variants,
  sizes: {
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
