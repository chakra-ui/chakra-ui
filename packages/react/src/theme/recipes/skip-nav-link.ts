import { defineRecipe } from "../../styled-system"

export const skipNavLinkRecipe = defineRecipe({
  className: "chakra-skip-nav",
  base: {
    borderRadius: "l2",
    fontWeight: "semibold",
    focusVisibleRing: "outside",
    _focusVisible: {
      padding: "4",
      position: "fixed",
      top: "6",
      insetStart: "6",
      bg: "bg.panel",
    },
  },
})
