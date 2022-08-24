import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { inputTheme } from "./input"
import { runIfFn } from "../utils/run-if-fn"

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  textAlign: "center",
})

const sizes = {
  lg: defineStyle({
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md",
  }),
  md: defineStyle({
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md",
  }),
  sm: defineStyle({
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm",
  }),
  xs: defineStyle({
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm",
  }),
}

const variants = {
  outline: defineStyle(
    (props) => runIfFn(inputTheme.variants?.outline, props)?.field ?? {},
  ),
  flushed: defineStyle(
    (props) => runIfFn(inputTheme.variants?.flushed, props)?.field ?? {},
  ),
  filled: defineStyle(
    (props) => runIfFn(inputTheme.variants?.filled, props)?.field ?? {},
  ),
  unstyled: inputTheme.variants?.unstyled.field ?? {},
}

export const pinInputTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: inputTheme.defaultProps,
})
