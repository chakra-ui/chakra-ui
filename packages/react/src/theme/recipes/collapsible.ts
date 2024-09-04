import { collapsibleAnataomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: collapsibleAnataomy.keys(),
  className: "chakra-collapsible",
  base: {
    content: {
      overflow: "hidden",
      _open: {
        animationName: "expand-height, fade-in",
        animationDuration: "moderate",
      },
      _closed: {
        animationName: "collapse-height, fade-out",
        animationDuration: "moderate",
      },
    },
  },
})
