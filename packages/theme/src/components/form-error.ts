import { formErrorAnatomy as parts } from "@chakra-ui/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"

export const formErrorRecipe = defineSlotRecipe({
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
