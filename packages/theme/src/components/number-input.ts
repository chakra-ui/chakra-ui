import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"
import Typography from "../foundations/typography"

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

const baseStyle = (props: Record<string, any>) => ({
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

  const resolvedFontSize = Typography.fontSizes[sizeStyle.field.fontSize]

  return {
    field: {
      ...sizeStyle.field,
      verticalAlign: "top",
    },
    stepper: {
      fontSize: `calc(${resolvedFontSize} * 0.75)`,
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
