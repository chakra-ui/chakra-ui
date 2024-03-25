import { defineRecipe } from "../../styled-system"

export const spinnerRecipe = defineRecipe({
  base: {
    display: "inline-block",
    borderWidth: "2px",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "full",
    width: "var(--size)",
    height: "var(--size)",
    animation: "spin",
    animationDuration: "fast",
  },
  variants: {
    size: {
      xs: { "--size": "sizes.3" },
      sm: { "--size": "sizes.4" },
      md: { "--size": "sizes.6" },
      lg: { "--size": "sizes.8" },
      xl: { "--size": "sizes.12" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
