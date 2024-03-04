import { fieldAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fieldSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      width: "100%",
      position: "relative",
    },
    requiredIndicator: {
      marginStart: "1",
      color: { base: "red.500", _dark: "red.300" },
    },
    helpText: {
      mt: "2",
      color: { base: "gray.600", _dark: "whiteAlpha.600" },
      lineHeight: "normal",
      fontSize: "sm",
    },
  },
})
