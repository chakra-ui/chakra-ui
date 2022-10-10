import { numberInputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { calc, cssVar, mode } from "@chakra-ui/theme-tools"
import typography from "../foundations/typography"
import { inputTheme } from "./input"
import { runIfFn } from "../utils/run-if-fn"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $stepperWidth = cssVar("number-input-stepper-width")
const $inputPadding = cssVar("number-input-input-padding")
const inputPaddingValue = calc($stepperWidth).add("0.5rem").toString()

const baseStyleRoot = defineStyle({
  [$stepperWidth.variable]: "sizes.6",
  [$inputPadding.variable]: inputPaddingValue,
})

const baseStyleField = defineStyle(
  (props) => runIfFn(inputTheme.baseStyle, props)?.field ?? {},
)

const baseStyleStepperGroup = defineStyle({
  width: [$stepperWidth.reference],
})

const baseStyleStepper = defineStyle((props) => {
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
})

const baseStyle = definePartsStyle((props) => ({
  root: baseStyleRoot,
  field: runIfFn(baseStyleField, props) ?? {},
  stepperGroup: baseStyleStepperGroup,
  stepper: runIfFn(baseStyleStepper, props) ?? {},
}))

type FontSize = keyof typeof typography.fontSizes

function getSize(size: FontSize) {
  //@ts-expect-error
  const sizeStyle = inputTheme.sizes?.[size]

  const radius: Partial<Record<FontSize, string>> = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm",
  }

  const _fontSize = (sizeStyle.field?.fontSize ?? "md") as FontSize
  const fontSize = typography.fontSizes[_fontSize]

  return definePartsStyle({
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
  })
}

const sizes = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
}

export const numberInputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps,
})
