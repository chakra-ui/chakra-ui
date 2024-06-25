import { anatomy } from "@ark-ui/anatomy/collapsible"
import { defineSlotRecipe } from "../../styled-system"

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys()],
  base: {
    content: {
      overflow: "hidden",
      _open: {
        animationName: "expand-height, fade-in",
        animationDuration: "normal",
      },
      _closed: {
        animationName: "collapse-height, fade-out",
        animationDuration: "normal",
      },
    },
  },
})
