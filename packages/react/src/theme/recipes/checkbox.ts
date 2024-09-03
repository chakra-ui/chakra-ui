import { checkboxAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  className: "chakra-checkbox",
  base: {
    root: {
      display: "inline-flex",
      gap: "2",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
      _disabled: {
        cursor: "not-allowed",
      },
    },

    control: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      verticalAlign: "top",
      color: "white",
      borderWidth: "1px",
      borderColor: "transparent",
      focusRing: "outside",
      _invalid: {
        colorPalette: "red",
        borderColor: "border.error",
      },
      _disabled: {
        opacity: "0.5",
      },
    },

    label: {
      userSelect: "none",
      fontWeight: "medium",
      _disabled: {
        opacity: "0.5",
      },
    },
  },

  variants: {
    size: {
      sm: {
        control: {
          boxSize: "3",
          borderRadius: "xs",
        },
        label: { textStyle: "xs" },
        indicator: { textStyle: "3xs" },
      },
      md: {
        control: {
          boxSize: "4",
          borderRadius: "xs",
        },
        label: { textStyle: "sm" },
        indicator: { textStyle: "2xs" },
      },
      lg: {
        control: {
          boxSize: "5",
          borderRadius: "sm",
        },
        label: { textStyle: "md" },
        indicator: { textStyle: "xs" },
      },
    },

    variant: {
      outline: {
        control: {
          borderWidth: "1px",
          borderColor: "border",
          _checked: {
            bg: "colorPalette.solid",
            borderColor: "colorPalette.solid",
            color: "colorPalette.contrast",
          },
          _indeterminate: {
            bg: "colorPalette.solid",
            borderColor: "colorPalette.solid",
          },
        },
      },
      subtle: {
        control: {
          borderWidth: "1px",
          bg: "colorPalette.subtle",
          borderColor: "colorPalette.subtle",
          _checked: {
            color: "colorPalette.fg",
          },
          _indeterminate: {
            color: "colorPalette.fg",
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: "outline",
    size: "md",
  },
})
