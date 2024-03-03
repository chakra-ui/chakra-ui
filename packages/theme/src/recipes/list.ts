import { listAnatomy as parts } from "@chakra-ui/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"

export const listSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
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
