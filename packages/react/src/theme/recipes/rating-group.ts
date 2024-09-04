import { ratingGroupAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const ratingGroupSlotRecipe = defineSlotRecipe({
  className: "chakra-rating-group",
  slots: ratingGroupAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
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

      _icon: {
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
          fontSize: "sm",
        },
      },
      sm: {
        item: {
          fontSize: "lg",
        },
      },
      md: {
        item: {
          fontSize: "2xl",
        },
      },
      lg: {
        item: {
          fontSize: "3xl",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
