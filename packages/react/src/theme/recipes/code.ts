import { defineRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  className: "chakra-code",
  base: {
    fontFamily: "mono",
    alignItems: "center",
    display: "inline-flex",
    borderRadius: "l2",
  },
  variants,
  defaultVariants,
})
