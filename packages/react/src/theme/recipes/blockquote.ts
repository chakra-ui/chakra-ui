import { blockquoteAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const blockquoteSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      paddingStart: "4",
      borderStartWidth: "4px",
      borderStartColor: {
        base: "colorPalette.200",
        _dark: "colorPalette.200/40",
      },
      colorPalette: "gray",
    },
    caption: {
      fontSize: "sm",
      fontStyle: "italic",
      opacity: 0.6,
    },
    content: {
      color: { base: "colorPalette.900", _dark: "colorPalette.300" },
    },
  },
})
