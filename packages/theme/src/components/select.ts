import { selectAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import { mergeWith } from "@chakra-ui/utils"
import { inputTheme } from "./input"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleField = defineStyle((props) => {
  return {
    ...inputTheme.baseStyle?.field,
    bg: mode("white", "gray.700")(props),
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props),
    },
  }
})

const baseStyleIcon = defineStyle({
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5,
  },
})

const baseStyle = definePartsStyle((props) => ({
  field: baseStyleField(props),
  icon: baseStyleIcon,
}))

const iconSpacing = defineStyle({
  paddingInlineEnd: "2rem",
})

const sizes = mergeWith({}, inputTheme.sizes, {
  lg: {
    field: iconSpacing,
  },
  md: {
    field: iconSpacing,
  },
  sm: {
    field: iconSpacing,
  },
  xs: {
    field: iconSpacing,
    icon: { insetEnd: "0.25rem" },
  },
})

export const selectTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps,
})
