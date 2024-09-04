import { statusAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const statusSlotRecipe = defineSlotRecipe({
  className: "chakra-status",
  slots: statusAnatomy.keys(),

  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
    },

    indicator: {
      width: "0.64em",
      height: "0.64em",
      flexShrink: 0,
      borderRadius: "full",
      forcedColorAdjust: "none",
      bg: "colorPalette.solid",
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          textStyle: "xs",
        },
      },
      md: {
        root: {
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          textStyle: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
