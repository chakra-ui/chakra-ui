import { blockquoteAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const blockquoteSlotRecipe = defineSlotRecipe({
  className: "chakra-blockquote",
  slots: blockquoteAnatomy.keys(),
  base: {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    caption: {
      textStyle: "sm",
      color: "fg.subtle",
    },
    icon: {
      textStyle: "xl",
      color: "colorPalette.fg",
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
          borderStartColor: "colorPalette.subtle",
        },
        icon: {
          color: "colorPalette.fg",
        },
      },

      solid: {
        root: {
          paddingX: "5",
          borderStartWidth: "4px",
          borderStartColor: "colorPalette.solid",
        },
        icon: {
          color: "colorPalette.solid",
        },
      },
    },
  },

  defaultVariants: {
    variant: "subtle",
    justify: "start",
  },
})
