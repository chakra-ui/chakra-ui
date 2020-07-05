import Input, { InputVariants } from "./input"

const PinInput = {
  defaultProps: Input.defaultProps,
  baseStyle: Input.baseStyle,
  variants: Input.variants,
  sizes: {
    lg: {
      Input: {
        fontSize: "lg",
        width: 12,
        height: 12,
        borderRadius: "md",
      },
    },
    md: {
      Input: {
        fontSize: "md",
        width: 10,
        height: 10,
        borderRadius: "md",
      },
    },
    sm: {
      Input: {
        fontSize: "sm",
        width: 8,
        height: 8,
        borderRadius: "sm",
      },
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
