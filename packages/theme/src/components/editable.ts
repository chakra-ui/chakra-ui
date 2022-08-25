import { editableAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStylePreview = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
})

const baseStyleInput = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 },
})

const baseStyleTextarea = defineStyle({
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
