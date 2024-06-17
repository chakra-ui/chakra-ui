import { anatomy } from "@ark-ui/anatomy/radio-group"
import { defineSlotRecipe } from "../../styled-system"
import { radiomarkRecipe } from "./radiomark"

export const radioCardSlotRecipe = defineSlotRecipe({
  slots: [...anatomy.keys(), "itemAddon", "itemIndicator"],
  base: {
    root: {
      colorPalette: "gray",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      borderWidth: "1px",
      userSelect: "none",
      pos: "relative",
      _focus: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
        outlineOffset: "2px",
      },
      _disabled: {
        color: "fg.subtle",
        cursor: "not-allowed",
        borderColor: "border.disabled!",
      },
    },
    label: {
      display: "inline-flex",
      fontWeight: "medium",
      _disabled: {
        color: "fg.subtle!",
      },
    },
    itemIndicator: radiomarkRecipe.base,
  },

  variants: {
    size: {
      sm: {
        item: {
          rounded: "md",
          fontSize: "xs",
        },
        itemControl: {
          padding: "3",
          gap: "3",
        },
        itemAddon: {
          paddingInline: "3",
          paddingBlock: "1.5",
          borderTopWidth: "1px",
        },
        itemIndicator: radiomarkRecipe.variants?.size.sm,
      },
      md: {
        item: {
          rounded: "md",
          fontSize: "sm",
        },
        itemControl: {
          padding: "4",
          gap: "4",
          rounded: "md",
        },
        itemAddon: {
          paddingInline: "4",
          paddingBlock: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: radiomarkRecipe.variants?.size.md,
      },
      lg: {
        item: {
          rounded: "lg",
          fontSize: "md",
        },
        itemControl: {
          padding: "4",
          gap: "4",
        },
        itemAddon: {
          paddingInline: "4",
          paddingBlock: "2",
          borderTopWidth: "1px",
        },
        itemIndicator: radiomarkRecipe.variants?.size.lg,
      },
    },

    variant: {
      plain: {
        item: {
          bg: "bg",
        },
      },
      subtle: {
        item: {
          bg: "bg",
          _checked: {
            borderColor: {
              base: "colorPalette.300",
              _dark: "colorPalette.300/40",
            },
          },
        },
        itemControl: {
          _checked: {
            bg: {
              base: "colorPalette.50",
              _dark: "colorPalette.400/20",
            },
          },
        },
        itemText: {
          _checked: {
            color: { base: "colorPalette.600", _dark: "colorPalette.200" },
          },
        },
        itemIndicator: radiomarkRecipe.variants?.variant.classic,
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "subtle",
    colorPalette: "gray",
  },
})
