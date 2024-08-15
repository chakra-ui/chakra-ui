import { defineRecipe } from "../../styled-system"

export const checkmarkRecipe = defineRecipe({
  className: "checkmark",
  base: {
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
      opacity: "0.5",
    },
  },
  variants: {
    size: {
      sm: {
        boxSize: "3.5",
        borderRadius: "xs",
      },
      md: {
        boxSize: "4",
        borderRadius: "xs",
      },
      lg: {
        boxSize: "5",
        borderRadius: "sm",
      },
    },

    variant: {
      outline: {
        borderWidth: "1px",
        borderColor: "inherit",
        "&:is([data-checked], [data-indeterminate])": {
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
        "&:is([data-checked], [data-indeterminate])": {
          color: {
            base: "colorPalette.700",
            _dark: "colorPalette.200",
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
        color: "fg.inverted",
        "&:is([data-checked], [data-indeterminate])": {
          bg: { base: "gray.800", _dark: "gray.200" },
          borderColor: { base: "gray.800", _dark: "gray.200" },
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
