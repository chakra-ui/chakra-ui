import { defineRecipe } from "../../styled-system"

export const markRecipe = defineRecipe({
  base: {
    bg: "transparent",
    color: "inherit",
    whiteSpace: "nowrap",
    colorPalette: "gray",
  },
  variants: {
    variant: {
      subtle: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        color: "inherit",
      },
      solid: {
        bg: "colorPalette.600",
        color: "white",
      },
      text: {
        fontWeight: "semibold",
      },
      plain: {},
    },
  },
  defaultVariants: {
    variant: "plain",
  },
})
