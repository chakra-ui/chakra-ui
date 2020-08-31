import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"

const parts = ["field", "stepper", "stepperGroup"]

const { variants, defaultProps } = Input

const baseStyleField = Input.baseStyle?.field

const baseStyleStepperGroup = {
  width: "24px",
}

function baseStyleStepper(props: Record<string, any>) {
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

const baseStyle = function (props: Record<string, any>) {
  return {
    field: baseStyleField,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props),
  }
}

function getSize(size: "sm" | "md" | "lg") {
  const sizeStyle = Input.sizes?.[size]

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

const sizes = {
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
}

export default {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
