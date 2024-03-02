import { defineRecipe } from "@chakra-ui/react"

export const dividerRecipe = defineRecipe({
  base: {
    opacity: 0.6,
    borderColor: "inherit",
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
