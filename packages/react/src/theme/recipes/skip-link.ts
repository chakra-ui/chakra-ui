import { defineRecipe } from "../../styled-system"

export const skipLinkRecipe = defineRecipe({
  base: {
    borderRadius: "md",
    fontWeight: "semibold",
    _focusVisible: {
      boxShadow: "outline",
      padding: "4",
      position: "fixed",
      top: "6",
      insetStart: "6",
      bg: { base: "white", _dark: "gray.700" },
    },
  },
})
