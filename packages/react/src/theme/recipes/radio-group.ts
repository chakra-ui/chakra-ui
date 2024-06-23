import { anatomy } from "@ark-ui/anatomy/radio-group"
import { defineSlotRecipe } from "../../styled-system"
import { radiomarkRecipe } from "./radiomark"

export const radioGroupSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    root: {
      colorPalette: "gray",
    },

    item: {
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
      _disabled: {
        cursor: "not-allowed",
      },
    },

    itemControl: radiomarkRecipe.base,

    label: {
      userSelect: "none",
      _disabled: {
        opacity: "0.5",
      },
    },
  },
  variants: {
    variant: {
      outline: {
        itemControl: radiomarkRecipe.variants?.variant?.outline,
      },

      subtle: {
        itemControl: radiomarkRecipe.variants?.variant?.subtle,
      },

      classic: {
        itemControl: radiomarkRecipe.variants?.variant?.classic,
      },
    },

    size: {
      sm: {
        item: {
          fontSize: "xs",
          gap: "0.35rem",
        },
        itemControl: {
          boxSize: "3",
        },
        label: {
          fontSize: "xs",
        },
      },

      md: {
        item: {
          fontSize: "sm",
          gap: "0.5rem",
        },
        itemControl: {
          boxSize: "4",
        },
        label: {
          fontSize: "sm",
        },
      },

      lg: {
        item: {
          fontSize: "md",
          gap: "0.5rem",
        },
        itemControl: {
          boxSize: "5",
        },
        label: {
          fontSize: "md",
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: "outline",
      colorPalette: "gray",
      css: {
        itemControl: {
          color: "fg.inverted",
          _checked: {
            bg: { base: "gray.800", _dark: "gray.200" },
            borderColor: { base: "gray.800", _dark: "gray.200" },
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: "md",
    variant: "outline",
    colorPalette: "gray",
  },
})
