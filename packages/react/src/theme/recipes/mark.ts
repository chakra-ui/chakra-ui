import { defineRecipe } from "../../styled-system"

export const markRecipe = defineRecipe({
  className: "chakra-mark",
  base: {
    bg: "transparent",
    color: "inherit",
    whiteSpace: "nowrap",
  },

  variants: {
    variant: {
      subtle: {
        bg: "colorPalette.subtle",
        color: "inherit",
      },
      solid: {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
      },
      text: {
        fontWeight: "medium",
      },
      plain: {},
    },
  },
})
