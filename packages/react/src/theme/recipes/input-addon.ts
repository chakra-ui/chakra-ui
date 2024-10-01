import { defineRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const inputAddonRecipe = defineRecipe({
  className: "chakra-input-addon",
  base: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  variants: {
    size: inputRecipe.variants!.size,
    variant: {
      outline: {
        border: "1px solid",
        borderColor: { _light: "border", _dark: "whiteAlpha.50" },
        bg: "bg.subtle",
      },
      filled: {
        border: "2px solid",
        borderColor: "transparent",
        bg: { _light: "gray.100", _dark: "whiteAlpha.50" },
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
