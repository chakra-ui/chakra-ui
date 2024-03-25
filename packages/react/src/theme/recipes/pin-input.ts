import { defineRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const pinInputRecipe = defineRecipe({
  base: {
    ...inputRecipe.base,
    textAlign: "center",
  },
  variants: {
    size: {
      lg: {
        fontSize: "lg",
        w: 12,
        h: 12,
        borderRadius: "md",
      },
      md: {
        fontSize: "md",
        w: 10,
        h: 10,
        borderRadius: "md",
      },
      sm: {
        fontSize: "sm",
        w: 8,
        h: 8,
        borderRadius: "sm",
      },
      xs: {
        fontSize: "xs",
        w: 6,
        h: 6,
        borderRadius: "sm",
      },
    },
    variant: inputRecipe.variants!.variant,
  },
  defaultVariants: inputRecipe.defaultVariants,
})
