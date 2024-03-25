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
    status: {
      default: {
        root: { colorPalette: "gray" },
      },
      info: {
        root: { colorPalette: "blue" },
      },
      warning: {
        root: { colorPalette: "orange" },
      },
      success: {
        root: { colorPalette: "green" },
      },
      error: {
        root: { colorPalette: "red" },
      },
      loading: {},
    },
    variant: {
      solid: {
        root: {
          bg: "colorPalette.600",
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
    status: "default",
  },
})
