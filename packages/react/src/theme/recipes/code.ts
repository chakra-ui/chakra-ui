import { defineRecipe } from "../../styled-system/index.ts"
import { badgeRecipe } from "./badge.ts"

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
