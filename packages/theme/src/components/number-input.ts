import { numberInputAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { calc, cssVar, mode } from "@chakra-ui/theme-tools"
import typography from "../foundations/typography"
import Input from "./input"

const { variants, defaultProps } = Input

const $stepperWidth = cssVar("number-input-stepper-width")

const $inputPadding = cssVar("number-input-input-padding")
const inputPaddingValue = calc($stepperWidth).add("0.5rem").toString()

const baseStyleRoot: SystemStyleObject = {
  [$stepperWidth.variable]: "24px",
  [$inputPadding.variable]: inputPaddingValue,
}

const baseStyleField: SystemStyleObject = Input.baseStyle?.field ?? {}

const baseStyleStepperGroup: SystemStyleObject = {
  width: [$stepperWidth.reference],
}

const baseStyleStepper: SystemStyleFunction = (props) => {
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

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  root: baseStyleRoot,
  field: baseStyleField,
  stepperGroup: baseStyleStepperGroup,
  stepper: baseStyleStepper(props),
})

type Size = "xs" | "sm" | "md" | "lg"

function getSize(size: Size): PartsStyleObject<typeof parts> {
  const sizeStyle = Input.sizes[size]

  const radius: Record<Size, string> = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm",
  }

  const _fontSize = sizeStyle.field?.fontSize ?? "md"
  const fontSize = typography.fontSizes[_fontSize.toString()]

  return {
    field: {
      ...sizeStyle.field,
      paddingInlineEnd: $inputPadding.reference,
      verticalAlign: "top",
    },
    stepper: {
      fontSize: calc(fontSize).multiply(0.75).toString(),
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
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
