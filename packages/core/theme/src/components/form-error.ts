import { formErrorAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar("form-error-color")

const baseStyleText = defineStyle({
  [$fg.variable]: `colors.red.500`,
  _dark: {
    [$fg.variable]: `colors.red.300`,
  },
  color: $fg.reference,
  mt: "2",
  fontSize: "sm",
  lineHeight: "normal",
})

const baseStyleIcon = defineStyle({
  marginEnd: "0.5em",
  [$fg.variable]: `colors.red.500`,
  _dark: {
    [$fg.variable]: `colors.red.300`,
  },
  color: $fg.reference,
})

const baseStyle = definePartsStyle({
  text: baseStyleText,
  icon: baseStyleIcon,
})

export const formErrorTheme = defineMultiStyleConfig({
  baseStyle,
})
