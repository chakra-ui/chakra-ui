import { defineRecipe } from "../def"

export const markRecipe = defineRecipe({
  className: "mark",
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
