import { listAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const listSlotRecipe = defineSlotRecipe({
  slots: listAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    item: {
      alignItems: "flex-start",
      display: "inline-flex",
      whiteSpace: "normal",
      "&:has(svg)": {
        alignItems: "center",
      },
    },
    icon: {
      marginEnd: "2",
      display: "inline",
      verticalAlign: "text-bottom",
    },
  },
})
