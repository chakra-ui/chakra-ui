import { statAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const statSlotRecipe = defineSlotRecipe({
  slots: statAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      flex: "1 1 0%",
    },
    label: {
      fontWeight: "medium",
    },
    helpText: {
      color: "fg.muted",
    },
    valueText: {
      verticalAlign: "baseline",
      fontWeight: "semibold",
      letterSpacing: "tight",
      fontFeatureSettings: "pnum",
      fontVariantNumeric: "proportional-nums",
    },
    indicator: {
      marginEnd: 1,
      "& svg": {
        w: "1em",
        h: "1em",
        verticalAlign: "middle",
      },
      "&[data-type=up]": {
        color: "fg.success",
      },
      "&[data-type=down]": {
        color: "fg.error",
      },
    },
  },

  variants: {
    size: {
      md: {
        label: {
          fontSize: "sm",
        },
        helpText: {
          fontSize: "sm",
        },
        valueText: {
          fontSize: "2xl",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
