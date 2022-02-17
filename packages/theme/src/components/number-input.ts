import { numberInputAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { calc, cssVar } from "@chakra-ui/theme-tools"
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

const baseStyleStepper: SystemStyleObject = {
  borderStart: "1px solid",
  _active: {
    _light: {
      bg: "gray.200",
    },

    _dark: {
      bg: "whiteAlpha.300",
    },
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  _light: {
    borderStartColor: "inherit",
    color: "inherit",
  },
  _dark: {
    borderStartColor: "whiteAlpha.300",
    color: "whiteAlpha.800",
  },
}

const baseStyle: PartsStyleObject<typeof parts> = {
  root: baseStyleRoot,
  field: baseStyleField,
  stepperGroup: baseStyleStepperGroup,
  stepper: baseStyleStepper,
}

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
