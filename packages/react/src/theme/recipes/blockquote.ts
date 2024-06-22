import { blockquoteAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const blockquoteSlotRecipe = defineSlotRecipe({
  slots: blockquoteAnatomy.keys(),
  base: {
    root: {
      position: "relative",
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
      color: "colorPalette.400",
    },
  },
  variants: {
    justify: {
      start: {
        root: {
          alignItems: "flex-start",
          textAlign: "start",
        },
      },
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
          paddingX: "5",
          borderStartWidth: "4px",
          borderStartColor: {
            base: "colorPalette.200",
            _dark: "colorPalette.200/40",
          },
        },
        icon: {
          color: "colorPalette.400",
        },
      },

      solid: {
        root: {
          paddingX: "5",
          borderStartWidth: "4px",
          borderStartColor: "colorPalette.600",
        },
        icon: {
          color: "colorPalette.600",
        },
      },

      plain: {
        root: {
          paddingX: "6",
        },
        icon: {
          color: "colorPalette.600",
        },
      },
    },
  },

  defaultVariants: {
    variant: "subtle",
    justify: "start",
    colorPalette: "gray",
  },
})
