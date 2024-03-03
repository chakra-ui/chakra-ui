import { defineRecipe } from "@chakra-ui/react"
import { inputRecipe } from "./input"

export const inputAddonRecipe = defineRecipe({
  variants: {
    size: inputRecipe.variants!.size,
    variant: {
      outline: {
        border: "1px solid",
        borderColor: { base: "inherit", _dark: "whiteAlpha.50" },
        bg: { base: "gray.100", _dark: "whiteAlpha.300" },
      },
      filled: {
        border: "2px solid",
        borderColor: "transparent",
        bg: { base: "gray.100", _dark: "whiteAlpha.50" },
      },
      flushed: {
        borderBottom: "1px solid",
        borderColor: "inherit",
        borderRadius: "0",
        px: "0",
        bg: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
