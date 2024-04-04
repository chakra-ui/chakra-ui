import { blockquoteAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const blockquoteSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      colorPalette: "gray",
    },
    caption: {
      fontSize: "sm",
      opacity: 0.6,
    },
    icon: {
      fontSize: "xl",
    },
  },
  variants: {
    justify: {
      start: {},
      center: {
        root: {
          alignItems: "center",
          textAlign: "center",
        },
      },
      end: {
        root: {
          alignItems: "flex-end",
          textAlign: "end",
        },
      },
    },
    variant: {
      subtle: {
        root: {
          borderStartWidth: "4px",
          paddingStart: "4",
          borderStartColor: {
            base: "colorPalette.200",
            _dark: "colorPalette.200/40",
          },
        },
        content: {
          color: { base: "colorPalette.900", _dark: "colorPalette.300" },
        },
        icon: {
          color: { base: "colorPalette.900", _dark: "colorPalette.300" },
        },
      },
      solid: {
        root: {
          paddingStart: "4",
          borderStartWidth: "4px",
          borderStartColor: "colorPalette.600",
        },
        content: {
          color: { base: "colorPalette.900", _dark: "colorPalette.300" },
        },
        icon: {
          color: { base: "colorPalette.900", _dark: "colorPalette.300" },
        },
      },
      plain: {},
    },
  },
  defaultVariants: {
    variant: "subtle",
    justify: "start",
    colorPalette: "gray",
  },
})
