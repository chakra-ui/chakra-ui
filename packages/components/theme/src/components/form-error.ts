import { formErrorAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import { runIfFn } from "../utils/run-if-fn"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleText = defineStyle((props) => {
  return {
    color: mode("red.500", "red.300")(props),
    mt: "2",
    fontSize: "sm",
    lineHeight: "normal",
  }
})

const baseStyleIcon = defineStyle((props) => {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props),
  }
})

const baseStyle = definePartsStyle((props) => ({
  text: runIfFn(baseStyleText, props),
  icon: runIfFn(baseStyleIcon, props),
}))

export const formErrorTheme = defineMultiStyleConfig({
  baseStyle,
})
