import { anatomy } from "@ark-ui/anatomy/checkbox"
import { defineSlotRecipe } from "../../styled-system"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  className: "chakra-checkbox",
  base: {
    root: {
      display: "inline-flex",
      gap: "2",
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
      _focus: {
        outline: "2px solid",
        outlineColor: "focusRing",
        outlineOffset: "2px",
      },
      _invalid: {
        colorPalette: "red",
        borderColor: "red.500",
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
          _indeterminate: {
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
          _indeterminate: {
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
          color: "fg.inverted",
          _checked: {
            bg: { base: "gray.800", _dark: "gray.200" },
            borderColor: { base: "gray.800", _dark: "gray.200" },
          },
          _indeterminate: {
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
