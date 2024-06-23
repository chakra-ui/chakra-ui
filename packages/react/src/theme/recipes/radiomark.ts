import { defineRecipe } from "../../styled-system"

export const radiomarkRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    verticalAlign: "top",
    color: "white",
    borderWidth: "1px",
    borderColor: "transparent",
    borderRadius: "full",
    _focus: {
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

    "& .dot": {
      height: "100%",
      width: "100%",
      borderRadius: "full",
      bg: "currentColor",
      scale: "0.4",
    },
  },

  variants: {
    variant: {
      outline: {
        borderWidth: "1px",
        borderColor: "inherit",
        _checked: {
          bg: "colorPalette.600",
          borderColor: "colorPalette.600",
        },
      },

      subtle: {
        borderWidth: "1px",
        bg: {
          base: "colorPalette.100",
          _dark: "colorPalette.200/20",
        },
        borderColor: {
          base: "colorPalette.200",
          _dark: "colorPalette.200/10",
        },
        color: "transparent",
        _checked: {
          color: {
            base: "colorPalette.700",
            _dark: "colorPalette.200",
          },
        },
      },

      classic: {
        borderWidth: "1px",
        borderColor: "inherit",
        _checked: {
          color: { base: "colorPalette.600", _dark: "colorPalette.300" },
          borderColor: "currentcolor",
        },
        "& .dot": {
          scale: "0.6",
        },
      },
    },

    size: {
      sm: {
        boxSize: "3",
      },

      md: {
        boxSize: "4",
      },

      lg: {
        boxSize: "5",
      },
    },
  },

  compoundVariants: [
    {
      variant: "outline",
      colorPalette: "gray",
      css: {
        color: "fg.inverted",
      },
    },
  ],

  defaultVariants: {
    variant: "outline",
    size: "md",
    colorPalette: "gray",
  },
})
