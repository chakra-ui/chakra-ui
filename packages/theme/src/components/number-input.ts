import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"
import typography from "../foundations/typography"

const parts = ["root", "field", "stepper", "stepperGroup"]

const { variants, defaultProps } = Input

const baseStyleRoot = {
  "--number-input-stepper-width": "24px",
  "--number-input-field-padding":
    "calc(var(--number-input-stepper-width) + 0.5rem)",
}

const baseStyleField = Input.baseStyle?.field

const baseStyleStepperGroup = {
  width: "var(--number-input-stepper-width)",
}

function baseStyleStepper(props: Record<string, any>) {
  return {
    borderStart: "1px solid",
    borderStartColor: mode("inherit", "whiteAlpha.300")(props),
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

const baseStyle = (props: Record<string, any>) => ({
  root: baseStyleRoot,
  field: baseStyleField,
  stepperGroup: baseStyleStepperGroup,
  stepper: baseStyleStepper(props),
})

function getSize(size: "xs" | "sm" | "md" | "lg") {
  const sizeStyle = Input.sizes[size]

  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm",
  }

  const resolvedFontSize = typography.fontSizes[sizeStyle.field.fontSize]

  return {
    field: {
      ...sizeStyle.field,
      paddingInlineEnd: "var(--number-input-field-padding)",
      verticalAlign: "top",
    },
    stepper: {
      fontSize: `calc(${resolvedFontSize} * 0.75)`,
      _first: {
        borderTopEndRadius: radius[size],
      },
      _last: {
        borderBottomEndRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1,
      },
    },
  }
}

const sizes = {
  xs: getSize("xs"),
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
