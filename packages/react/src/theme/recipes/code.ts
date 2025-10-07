import { defineRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  base: {
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    pr: "0.6em",   // Fix: preventing from text touching border
    borderRadius: "sm",
  },
})