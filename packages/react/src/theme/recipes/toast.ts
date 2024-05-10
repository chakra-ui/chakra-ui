import { toastAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const toastSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      width: "auto",
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      overflow: "hidden",
      gap: "3",
      paddingY: "4",
      paddingStart: "4",
      paddingEnd: "8",
      rounded: "md",
      fontSize: "sm",
      translate: "var(--x) var(--y)",
      scale: "var(--scale)",
      zIndex: "var(--z-index)",
      height: "var(--height)",
      opacity: "var(--opacity)",
      willChange: "translate, opacity, scale",
      transition:
        "translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms",
      transitionTimingFunction: "cubic-bezier(0.21, 1.02, 0.73, 1)",
      _closed: {
        transition: "translate 400ms, scale 400ms, opacity 200ms",
        transitionTimingFunction: "cubic-bezier(0.06, 0.71, 0.55, 1)",
      },
      "&[data-type=info]": {
        colorPalette: "blue",
      },
      "&[data-type=warning]": {
        colorPalette: "orange",
      },
      "&[data-type=success]": {
        colorPalette: "green",
      },
      "&[data-type=error]": {
        colorPalette: "red",
      },
      "&[data-type=loading]": {
        colorPalette: "gray",
      },
    },
    title: {
      fontWeight: "semibold",
      lineHeight: "1.2",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      lineHeight: "1.5",
      opacity: "0.8",
    },
    icon: {
      flexShrink: 0,
    },
  },
  variants: {
    variant: {
      solid: {
        root: {
          bg: "colorPalette.700",
          color: "white",
        },
        icon: {
          color: "white",
        },
      },
      raised: {
        root: {
          bg: "bg.panel",
          color: "fg",
          boxShadow: "md",
        },
        icon: {
          color: "colorPalette.600",
        },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
})
