import { radioGroupAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { radiomarkRecipe } from "./radiomark"

export const radioCardSlotRecipe = defineSlotRecipe({
  className: "chakra-radio-card",
  slots: radioGroupAnatomy.keys(),
  base: {
    item: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      _focus: {
        bg: "colorPalette.subtle/20",
      },
      _disabled: {
        opacity: 0.8,
        borderColor: "border.disabled",
      },
    },
    label: {
      display: "inline-flex",
      fontWeight: "medium",
      textStyle: "sm",
      _disabled: {
        color: "fg.subtle",
      },
    },
    itemText: {
      lineHeight: "1.2",
      fontWeight: "medium",
    },
    itemControl: {
      display: "inline-flex",
      flex: "1",
      pos: "relative",
      rounded: "inherit",
      _disabled: {
        bg: "bg.subtle",
      },
    },
    itemIndicator: radiomarkRecipe.base,
    itemAddon: {
      roundedBottom: "inherit",
      _disabled: {
        color: "fg.subtle",
      },
    },
  },

  variants: {
    size: {
      sm: {
        item: {
          rounded: "md",
          textStyle: "xs",
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
          textStyle: "sm",
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
        itemIndicator: radiomarkRecipe.variants?.size.md,
      },
      lg: {
        item: {
          rounded: "lg",
          textStyle: "md",
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
      surface: {
        item: {
          borderWidth: "1px",
          bg: "bg",
          _checked: {
            bg: "colorPalette.muted",
            color: "colorPalette.fg",
            borderColor: "colorPalette.emphasized",
          },
        },
        itemIndicator: radiomarkRecipe.variants?.variant.outline,
      },

      subtle: {
        item: {
          bg: "bg.subtle",
        },
        itemControl: {
          _checked: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
        },
        itemIndicator: radiomarkRecipe.variants?.variant.classic,
      },

      outline: {
        item: {
          borderWidth: "1px",
          bg: "bg",
          _checked: {
            boxShadow: "0 0 0 1px var(--shadow-color)",
            boxShadowColor: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator: radiomarkRecipe.variants?.variant.outline,
      },

      solid: {
        item: {
          borderWidth: "1px",
          bg: "bg",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        itemIndicator: radiomarkRecipe.variants?.variant.inverted,
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
