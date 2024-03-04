import { alertAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const alertSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      gap: "3",
      px: "4",
      py: "4",
    },
    title: {
      fontWeight: "bold",
      lineHeight: "1",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      lineHeight: "6",
    },
    icon: {
      flexShrink: 0,
      fontSize: "lg",
    },
  },
  variants: {
    status: {
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
    },
    variant: {
      subtle: {
        root: {
          bg: { base: "colorPalette.100", _dark: "colorPalette.200/16" },
        },
        icon: {
          color: { base: "colorPalette.600", _dark: "colorPalette.200" },
        },
      },
      "left-accent": {
        root: {
          bg: { base: "colorPalette.100", _dark: "colorPalette.200/16" },
          paddingStart: "3",
          borderStartWidth: "4px",
          borderStartColor: {
            base: "colorPalette.600",
            _dark: "colorPalette.200",
          },
        },
        icon: {
          color: { base: "colorPalette.600", _dark: "colorPalette.200" },
        },
      },
      "top-accent": {
        root: {
          bg: { base: "colorPalette.100", _dark: "colorPalette.200/16" },
          pt: "2",
          borderTopWidth: "4px",
          borderTopColor: {
            base: "colorPalette.600",
            _dark: "colorPalette.200",
          },
        },
        icon: {
          color: { base: "colorPalette.600", _dark: "colorPalette.200" },
        },
      },
      solid: {
        root: {
          bg: { base: "colorPalette.600", _dark: "colorPalette.200" },
          color: { base: "white", _dark: "gray.900" },
        },
        icon: {
          color: { base: "white", _dark: "gray.900" },
        },
      },
    },
  },
  defaultVariants: {
    status: "info",
    variant: "subtle",
  },
})
