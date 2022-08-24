import { formAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import { runIfFn } from "../utils/run-if-fn"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleRequiredIndicator = defineStyle((props) => {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props),
  }
})

const baseStyleHelperText = defineStyle((props) => {
  return {
    mt: 2,
    color: mode("gray.600", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm",
  }
})

const baseStyle = definePartsStyle((props) => ({
  container: { width: "100%", position: "relative" },
  requiredIndicator: runIfFn(baseStyleRequiredIndicator, props),
  helperText: runIfFn(baseStyleHelperText, props),
}))

export const formTheme = defineMultiStyleConfig({
  baseStyle,
})
