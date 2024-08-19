import { anatomy } from "@ark-ui/anatomy/collapsible"
import { defineSlotRecipe } from "../../styled-system"

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys()],
  className: "collapsible",
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
