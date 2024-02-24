import { editableAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const sharedStyles = defineStyle({
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
})

const baseStylePreview = defineStyle({
  ...sharedStyles,
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  cursor: "text",
  display: "inline-block",
})

const baseStyleInput = defineStyle({
  ...sharedStyles,
  borderRadius: "md",
  outline: 0,
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 },
})

const baseStyleTextarea = defineStyle({
  ...sharedStyles,
  outline: 0,
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 },
})

const baseStyle = definePartsStyle({
  preview: baseStylePreview,
  input: baseStyleInput,
  textarea: baseStyleTextarea,
})

export const editableTheme = defineMultiStyleConfig({
  baseStyle,
})
