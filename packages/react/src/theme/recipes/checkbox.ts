import { checkboxAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "inline-flex",
      gap: "0.5rem",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
      colorPalette: "gray",
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
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
        outlineOffset: "2px",
      },
      _invalid: {
        colorPalette: "red",
        borderColor: "red.500",
      },
      _disabled: {
        bg: "bg.muted!",
        borderColor: "border.subtle!",
        color: "fg.subtle/80!",
      },
    },
    label: {
      userSelect: "none",
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
        label: { fontSize: "xs" },
        indicator: { fontSize: "3xs" },
      },
      md: {
        control: {
          boxSize: "4",
          borderRadius: "xs",
        },
        label: { fontSize: "sm" },
        indicator: { fontSize: "2xs" },
      },
      lg: {
        control: {
          boxSize: "5",
          borderRadius: "sm",
        },
        label: { fontSize: "md" },
        indicator: { fontSize: "xs" },
      },
    },
    variant: {
      outline: {
        control: {
          borderWidth: "1px",
          borderColor: "inherit",
          _checked: {
            bg: "colorPalette.600",
            borderColor: "colorPalette.600",
          },
        },
      },
      subtle: {
        control: {
          borderWidth: "1px",
          bg: {
            base: "colorPalette.100",
            _dark: "colorPalette.200/20",
          },
          borderColor: {
            base: "colorPalette.200",
            _dark: "colorPalette.200/10",
          },
          _checked: {
            color: { base: "colorPalette.700", _dark: "colorPalette.200" },
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      colorPalette: "gray",
      css: {
        control: {
          color: "fg.inverse",
          _checked: {
            bg: { base: "gray.800", _dark: "gray.200" },
            borderColor: { base: "gray.800", _dark: "gray.200" },
          },
        },
      },
    },
  ],
  defaultVariants: {
    variant: "outline",
    size: "md",
    colorPalette: "gray",
  },
})
