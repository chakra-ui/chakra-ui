import {
  BaseStyle,
  DefaultProps,
  mode,
  Sizes,
  SizeType,
  Variants,
  VariantType,
} from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["input", "stepper", "stepperGroup"],
  sizes: input.register.sizes,
  variants: input.register.variants,
} as const

type Variant = VariantType<typeof register>
type Size = SizeType<typeof register>

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    input: input.baseStyle.input,
    stepperGroup: {
      width: "24px",
    },
    stepper: {
      borderLeft: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.300")(props),
      color: mode("inherit", "whiteAlpha.800")(props),
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }
}

const sizes: Sizes<typeof register> = {
  sm: getSizeStyle("sm"),
  md: getSizeStyle("md"),
  lg: getSizeStyle("lg"),
}

function getSizeStyle(size: "sm" | "md" | "lg") {
  const inputPartsStyle = input.sizes[size]
  const inputStyle =
    typeof inputPartsStyle !== "function" ? inputPartsStyle?.input : {}

  return {
    input: inputStyle,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: size === "lg" ? 3 : 1,
      },
      _last: {
        borderBottomRightRadius: size === "lg" ? 3 : 1,
        marginTop: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const variants: Variants<typeof register> = {
  outline: (props) => ({ input: getInputVariant(props, "outline") }),
  filled: (props) => ({ input: getInputVariant(props, "filled") }),
  flushed: (props) => ({ input: getInputVariant(props, "flushed") }),
  unstyled: (props) => ({ input: getInputVariant(props, "unstyled") }),
}

function getInputVariant(props: any, variant: Variant) {
  const inputPartsStyle = input.variants[variant]
  const partsStyle =
    typeof inputPartsStyle === "function"
      ? inputPartsStyle(props)
      : inputPartsStyle
  return partsStyle?.input ?? {}
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const numberInput = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default numberInput
