import {
  BaseStyle,
  mode,
  runIfFn,
  Sizes,
  Variants,
  VariantType,
} from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["field", "stepper", "stepperGroup"],
  sizes: input.register.sizes,
  variants: input.register.variants,
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    field: input.baseStyle.field,
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
    typeof inputPartsStyle !== "function" ? inputPartsStyle?.field : {}

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
  }

  return {
    field: inputStyle,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size],
      },
      _last: {
        borderBottomRightRadius: radius[size],
        marginTop: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const variants: Variants<typeof register> = {
  outline: (props) => ({ field: getVariantStyle("outline", props) }),
  filled: (props) => ({ field: getVariantStyle("filled", props) }),
  flushed: (props) => ({ field: getVariantStyle("flushed", props) }),
  unstyled: (props) => ({ field: getVariantStyle("unstyled", props) }),
}

function getVariantStyle(variant: VariantType<typeof register>, props: any) {
  const partsStyle = runIfFn(input.variants[variant], props)
  return partsStyle?.field ?? {}
}

const defaultProps = input.defaultProps

const numberInput = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default numberInput
