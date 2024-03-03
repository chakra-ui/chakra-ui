import { defineRecipe } from "@chakra-ui/react"
import { badgeRecipe } from "./badge"

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  base: {
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    borderRadius: "sm",
  },
  variants,
  defaultVariants,
})
