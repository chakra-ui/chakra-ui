import { defineRecipe } from "../../styled-system"

export const linkRecipe = defineRecipe({
  base: {
    transitionProperty: "common",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    textDecoration: { base: "none", _hover: "underline" },
    outline: "none",
    color: "inherit",
    _focusVisible: {
      boxShadow: "outline",
    },
  },
})
