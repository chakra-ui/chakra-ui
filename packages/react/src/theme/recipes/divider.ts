import { defineRecipe } from "../../styled-system"

export const dividerRecipe = defineRecipe({
  base: {
    borderColor: "border.muted",
  },
  variants: {
    variant: {
      solid: {
        borderStyle: "solid",
      },
      dashed: {
        borderStyle: "dashed",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
})
