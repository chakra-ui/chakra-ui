import { defineRecipe } from "@sh3yk0-ui/react"

export const cardRecipe = defineRecipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    variant: {
      primary: {
        bg: "teal.600",
        color: "white",
      },
    },
  },
})
