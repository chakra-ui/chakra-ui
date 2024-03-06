import { defineRecipe } from "../../styled-system"

export const headingRecipe = defineRecipe({
  base: {
    fontFamily: "heading",
    fontWeight: "semibold",
  },
  variants: {
    size: {
      "4xl": {
        fontSize: { base: "6xl", md: "7xl" },
        lineHeight: 1,
      },
      "3xl": {
        fontSize: { base: "5xl", md: "6xl" },
        lineHeight: 1,
      },
      "2xl": {
        fontSize: { base: "4xl", md: "5xl" },
        lineHeight: { base: 1.2, md: 1 },
      },
      xl: {
        fontSize: { base: "3xl", md: "4xl" },
        lineHeight: { base: 1.33, md: 1.2 },
      },
      lg: {
        fontSize: { base: "2xl", md: "3xl" },
        lineHeight: { base: 1.33, md: 1.2 },
      },
      md: {
        fontSize: "xl",
        lineHeight: 1.2,
      },
      sm: {
        fontSize: "md",
        lineHeight: 1.2,
      },
      xs: {
        fontSize: "sm",
        lineHeight: 1.2,
      },
    },
  },
  defaultVariants: {
    size: "xl",
  },
})
