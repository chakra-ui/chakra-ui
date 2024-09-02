import { editableAnatomy } from "../../anatomy"
import { defineSlotRecipe, defineStyle } from "../../styled-system"

const sharedStyles = defineStyle({
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
})

export const editableSlotRecipe = defineSlotRecipe({
  slots: editableAnatomy.keys(),
  className: "chakra-editable",
  base: {
    preview: {
      ...sharedStyles,
      borderRadius: "md",
      py: "1",
      transitionProperty: "common",
      transitionDuration: "normal",
      cursor: "text",
      display: "inline-block",
    },
    input: {
      ...sharedStyles,
      borderRadius: "md",
      outline: 0,
      py: "1",
      transitionProperty: "common",
      transitionDuration: "normal",
      width: "full",
      focusVisibleRing: "inside",
      _placeholder: { opacity: 0.6 },
    },
    textarea: {
      ...sharedStyles,
      outline: 0,
      borderRadius: "md",
      py: "1",
      transitionProperty: "common",
      transitionDuration: "normal",
      width: "full",
      focusVisibleRing: "inside",
      _placeholder: { opacity: 0.6 },
    },
  },
})
