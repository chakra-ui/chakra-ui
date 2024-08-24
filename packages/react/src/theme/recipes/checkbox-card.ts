import { checkboxCardAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { checkmarkRecipe } from "./checkmark"

export const checkboxCardSlotRecipe = defineSlotRecipe({
  slots: checkboxCardAnatomy.keys(),
  className: "chakra-checkbox-card",
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      borderWidth: "1px",
      userSelect: "none",
      colorPalette: "gray",
      pos: "relative",
      _focus: {
        outline: "2px solid",
        outlineColor: "focusRing",
        outlineOffset: "2px",
      },
      _disabled: {
        opacity: 0.8,
        color: "fg.muted",
        cursor: "not-allowed",
        borderColor: "border.disabled!",
      },
      _invalid: {
        outline: "2px solid",
        outlineColor: "border.error",
      },
    },
    control: {
      display: "inline-flex",
      flex: "1",
      position: "relative",
      rounded: "inherit",
      justifyContent: "space-between",
      _disabled: {
        bg: "bg.muted!",
      },
    },
    label: {
      fontWeight: "medium",
      display: "flex",
      alignItems: "center",
      gap: "2",
      _disabled: {
        color: "fg.muted!",
      },
    },
    addon: {
      _disabled: {
        color: "fg.muted",
      },
    },
    indicator: checkmarkRecipe.base,
  },

  variants: {
    size: {
      sm: {
        root: {
          rounded: "md",
          textStyle: "xs",
        },
        control: {
          padding: "3",
          gap: "3",
        },
        addon: {
          paddingInline: "3",
          paddingBlock: "1.5",
          borderTopWidth: "1px",
        },
        indicator: checkmarkRecipe.variants?.size.sm,
      },
      md: {
        root: {
          rounded: "md",
          textStyle: "sm",
        },
        control: {
          padding: "4",
          gap: "4",
          rounded: "md",
        },
        addon: {
          paddingInline: "4",
          paddingBlock: "2",
          borderTopWidth: "1px",
        },
        indicator: checkmarkRecipe.variants?.size.md,
      },
      lg: {
        root: {
          rounded: "lg",
          textStyle: "md",
        },
        control: {
          padding: "4",
          gap: "4",
        },
        addon: {
          paddingInline: "4",
          paddingBlock: "2",
          borderTopWidth: "1px",
        },
        indicator: checkmarkRecipe.variants?.size.lg,
      },
    },
    variant: {
      plain: {
        root: {
          bg: "bg",
        },
        indicator: checkmarkRecipe.variants?.variant.outline,
      },

      subtle: {
        root: {
          bg: "bg",
          _checked: {
            borderColor: {
              base: "colorPalette.300",
              _dark: "colorPalette.300/40",
            },
          },
        },
        control: {
          _checked: {
            bg: {
              base: "colorPalette.50",
              _dark: "colorPalette.400/20",
            },
          },
        },
        label: {
          _checked: {
            color: { base: "colorPalette.800", _dark: "colorPalette.200" },
          },
        },
        indicator: checkmarkRecipe.variants?.variant.outline,
      },
    },
  },

  compoundVariants: [
    {
      colorPalette: "gray",
      css: {
        indicator: {
          color: "fg.inverted",
          "&:is([data-checked], [data-indeterminate])": {
            bg: { base: "gray.800", _dark: "gray.200" },
            borderColor: { base: "gray.800", _dark: "gray.200" },
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: "md",
    variant: "subtle",
    colorPalette: "gray",
  },
})
