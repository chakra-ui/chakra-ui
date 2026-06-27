import { defineSlotRecipe } from "../def"

export const statusSlotRecipe = defineSlotRecipe({
  className: "status",
  slots: ["root", "indicator"],
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
