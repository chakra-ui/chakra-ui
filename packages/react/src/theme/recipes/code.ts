import { defineRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  base: {
    fontFamily: "mono",
  },
  variants,
  defaultVariants,
})
