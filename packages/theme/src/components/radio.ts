import { radioAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { runIfFn } from "../utils/run-if-fn"
import { checkboxTheme } from "./checkbox"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleControl = defineStyle((props) => {
  const controlStyle = runIfFn(checkboxTheme.baseStyle, props)?.control

  return {
    ...controlStyle,
    borderRadius: "full",
    _checked: {
      ...controlStyle?.["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }
})

const baseStyle = definePartsStyle((props) => ({
  label: checkboxTheme.baseStyle?.(props).label,
  container: checkboxTheme.baseStyle?.(props).container,
  control: baseStyleControl(props),
}))

const sizes = {
  md: definePartsStyle({
    control: { w: "4", h: "4" },
    label: { fontSize: "md" },
  }),
  lg: definePartsStyle({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" },
  }),
  sm: definePartsStyle({
    control: { width: "3", height: "3" },
    label: { fontSize: "sm" },
  }),
}

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
