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
      userSelect: "none",
      position: "relative",
      focusVisibleRing: "outside",
      _disabled: {
        opacity: 0.8,
        borderColor: "border.subtle",
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
    },
    label: {
      fontWeight: "medium",
      display: "flex",
      alignItems: "center",
      gap: "2",
      _disabled: {
        opacity: 0.5,
      },
    },
    addon: {
      _disabled: {
        opacity: 0.5,
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
          px: "3",
          py: "1.5",
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
          px: "4",
          py: "2",
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
          px: "4",
          py: "2",
          borderTopWidth: "1px",
        },
        indicator: checkmarkRecipe.variants?.size.lg,
      },
    },

    variant: {
      surface: {
        root: {
          borderWidth: "1px",
          borderColor: "border",
          bg: "bg",
          _checked: {
            bg: "colorPalette.muted",
            color: "colorPalette.fg",
            borderColor: "colorPalette.emphasized",
          },
          _disabled: {
            bg: "bg.subtle",
          },
        },
        indicator: checkmarkRecipe.variants?.variant.outline,
      },

      subtle: {
        root: {
          bg: "bg.subtle/60",
          _hover: {
            bg: "bg.subtle",
          },
        },
        control: {
          _checked: {
            bg: "colorPalette.subtle",
            color: "colorPalette.fg",
          },
          _disabled: {
            bg: "bg.subtle",
          },
        },
        indicator: checkmarkRecipe.variants?.variant.plain,
      },

      outline: {
        root: {
          borderWidth: "1px",
          borderColor: "border",
          bg: "bg",
          _hover: {
            bg: "bg.muted",
          },
          _checked: {
            boxShadow: "0 0 0 1px var(--shadow-color)",
            boxShadowColor: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
        control: {
          _disabled: {
            bg: "bg.subtle",
          },
        },
        indicator: checkmarkRecipe.variants?.variant.outline,
      },

      solid: {
        root: {
          borderWidth: "1px",
          bg: "bg",
          _checked: {
            bg: "colorPalette.solid",
            color: "colorPalette.contrast",
            borderColor: "colorPalette.solid",
          },
        },
        control: {
          _disabled: {
            opacity: 0.8,
          },
        },
        indicator: checkmarkRecipe.variants?.variant.inverted,
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
