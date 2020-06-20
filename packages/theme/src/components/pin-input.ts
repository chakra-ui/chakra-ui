import Input, { InputProps, InputVariants } from "./input"
import { ComponentTheme } from "@chakra-ui/theme-tools"

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

export const PinInputSizes = {
  lg: "lg",
  md: "md",
  sm: "sm",
}

export const PinInputVariants = InputVariants

export default PinInput
