import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const {
  defaultProps,
  variantFilled,
  variantFlushed,
  variantOutline,
  variantUnstyled,
} = inputStyles

function getSize(size: "sm" | "md" | "lg") {
  const sizeStyle = inputStyles.sizes?.[size]

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
  }

  return {
    field: sizeStyle?.field,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size],
      },
      _last: {
        borderBottomRightRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const parts = {
  field: "the input field",
  stepper: "desktop - the increment and decrement button",
  stepperGroup: "desktop - the increment and decrement button group",
}

const baseStyleField = inputStyles.baseStyle?.field

const baseStyleStepperGroup = {
  width: "24px",
}

// @ts-ignore
const baseStyleStepper = function (props) {
  return {
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
  }
}

// @ts-ignore
const baseStyle = function (props) {
  return {
    field: baseStyleField,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props),
  }
}

const sizes = {
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
}

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

const numberInput = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  variants,
  // @ts-ignore
  defaultProps,
})

export const numberInputStyles = {
  parts,
  sizes,
  baseStyleField,
  baseStyleStepper,
  baseStyleStepperGroup,
  variantFilled,
  variantFlushed,
  variantOutline,
  variantUnstyled,
  defaultProps,
}

export default numberInput
