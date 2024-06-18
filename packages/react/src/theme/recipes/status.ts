import { defineSlotRecipe } from "../../styled-system"

export const statusSlotRecipe = defineSlotRecipe({
  slots: ["root", "indicator"],

  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      colorPalette: "gray",
    },

    indicator: {
      width: "0.64em",
      height: "0.64em",
      flexShrink: 0,
      borderRadius: "full",
      forcedColorAdjust: "none",
      bg: "colorPalette.500",
    },
  },

  variants: {
    size: {
      sm: {
        root: { fontSize: "xs" },
      },
      md: {
        root: { fontSize: "sm" },
      },
      lg: {
        root: { fontSize: "md" },
      },
    },
  },

  defaultVariants: {
    size: "md",
    colorPalette: "gray",
  },
})
