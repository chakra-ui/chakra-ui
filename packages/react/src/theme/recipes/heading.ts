import { defineRecipe } from "../../styled-system"

export const headingRecipe = defineRecipe({
  base: {
    fontFamily: "heading",
    fontWeight: "semibold",
  },
  variants: {
    size: {
      xs: { value: { textStyle: "xs" } },
      sm: { value: { textStyle: "sm" } },
      md: { value: { textStyle: "md" } },
      lg: { value: { textStyle: "lg" } },
      xl: { value: { textStyle: "xl" } },
      "2xl": { value: { textStyle: "2xl" } },
      "3xl": { value: { textStyle: "3xl" } },
      "4xl": { value: { textStyle: "4xl" } },
      "5xl": { value: { textStyle: "5xl" } },
      "6xl": { value: { textStyle: "6xl" } },
      "7xl": { value: { textStyle: "7xl" } },
    },
  },
  defaultVariants: {
    size: "xl",
  },
})
