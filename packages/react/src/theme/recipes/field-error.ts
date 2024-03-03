import { defineSlotRecipe } from "@chakra-ui/react"
import { formErrorAnatomy as parts } from "../../anatomy"

export const fieldErrorSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    text: {
      mt: "2",
      fontSize: "sm",
      lineHeight: "normal",
      color: { base: "red.500", _dark: "red.300" },
    },
    icon: {
      marginEnd: "0.5em",
      color: { base: "red.500", _dark: "red.300" },
    },
  },
})
