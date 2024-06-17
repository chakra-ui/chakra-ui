import { anatomy } from "@ark-ui/anatomy/rating-group"
import { defineSlotRecipe } from "../../styled-system"

export const ratingGroupSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys(), "itemIndicator"],
  base: {
    root: {
      colorPalette: "orange",
    },

    control: {
      display: "inline-flex",
      alignItems: "center",
    },

    item: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    },

    itemIndicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      position: "relative",

      "& svg": {
        stroke: "currentColor",
        width: "100%",
        height: "100%",
        display: "inline-block",
        flexShrink: 0,
        position: "absolute",
        left: 0,
        top: 0,
      },

      "& [data-bg]": {
        color: { base: "gray.300", _dark: "gray.700" },
      },

      "& [data-fg]": {
        color: "transparent",
      },

      "&[data-highlighted]:not([data-half])": {
        "& [data-fg]": {
          color: "colorPalette.500",
        },
      },

      "&[data-half]": {
        "& [data-fg]": {
          color: "colorPalette.500",
          clipPath: "inset(0 50% 0 0)",
        },
      },
    },
  },

  variants: {
    size: {
      sm: {
        item: {
          fontSize: "1.125rem",
        },
      },
      md: {
        item: {
          fontSize: "1.5rem",
        },
      },
      lg: {
        item: {
          fontSize: "2rem",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    colorPalette: "orange",
  },
})
