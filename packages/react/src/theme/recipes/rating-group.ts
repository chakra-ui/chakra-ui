import { ratingGroupAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const ratingGroupSlotRecipe = defineSlotRecipe({
  className: "chakra-rating-group",
  slots: ratingGroupAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
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
        color: "bg.emphasized",
      },

      "& [data-fg]": {
        color: "transparent",
      },

      "&[data-highlighted]:not([data-half])": {
        "& [data-fg]": {
          color: "colorPalette.solid",
        },
      },

      "&[data-half]": {
        "& [data-fg]": {
          color: "colorPalette.solid",
          clipPath: "inset(0 50% 0 0)",
        },
      },
    },
  },

  variants: {
    size: {
      xs: {
        item: {
          fontSize: "0.875rem",
        },
      },
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
