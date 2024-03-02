import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import { defineSlotRecipe } from "@chakra-ui/react"

export const alertRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      px: "4",
      py: "3",
      colorScheme: "blue",
    },
    title: {
      fontWeight: "bold",
      lineHeight: "6",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      lineHeight: "6",
    },
    icon: {
      flexShrink: 0,
      marginEnd: "3",
      w: "5",
      h: "6",
    },
  },
  variants: {
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
        },
        icon: {
          color: { base: "white", _dark: "gray.900" },
        },
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
  },
})
