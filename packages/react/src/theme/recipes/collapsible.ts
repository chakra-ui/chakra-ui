import { anatomy } from "@ark-ui/anatomy/collapsible"
import { defineSlotRecipe } from "../../styled-system"

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys()],
  base: {
    content: {
      overflow: "hidden",
      _open: {
        animation: "collapse-in 250ms",
      },
      _closed: {
        animation: "collapse-out 250ms",
      },
    },
  },
})
