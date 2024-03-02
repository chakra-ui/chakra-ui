import { defineRecipe } from "@chakra-ui/react"

export const spinnerRecipe = defineRecipe({
  base: {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "full",
    width: "var(--size)",
    height: "var(--size)",
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
