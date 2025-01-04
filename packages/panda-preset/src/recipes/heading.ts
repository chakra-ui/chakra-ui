import { defineRecipe } from "../def"

export const headingRecipe = defineRecipe({
  className: "heading",
  base: {
    fontFamily: "heading",
    fontWeight: "semibold",
  },
  variants: {
    size: {
      xs: {
        textStyle: "xs",
      },
      sm: {
        textStyle: "sm",
      },
      md: {
        textStyle: "md",
      },
      lg: {
        textStyle: "lg",
      },
      xl: {
        textStyle: "xl",
      },
      "2xl": {
        textStyle: "2xl",
      },
      "3xl": {
        textStyle: "3xl",
      },
      "4xl": {
        textStyle: "4xl",
      },
      "5xl": {
        textStyle: "5xl",
      },
      "6xl": {
        textStyle: "6xl",
      },
      "7xl": {
        textStyle: "7xl",
      },
    },
  },
  defaultVariants: {
    size: "xl",
  },
})
