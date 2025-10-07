import { defineRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const { variants, defaultVariants } = badgeRecipe

export const codeRecipe = defineRecipe({
  base: {
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    borderRadius: "sm",
  },
  variants: {
    block: {
      true: {
        pr: "0.6em",   // only applies when used as a block,corrected from prevoius pull request @Coderxrohan
        overflowX: "auto",
        whiteSpace: "nowrap",
      },
    },
  },
  defaultVariants,
})
