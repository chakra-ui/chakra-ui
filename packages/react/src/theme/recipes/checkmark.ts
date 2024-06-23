import { defineRecipe } from "../../styled-system"

export const checkmarkRecipe = defineRecipe({
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
      bg: "bg.muted!",
      borderColor: "border.subtle!",
      color: "fg.subtle/80!",
    },
  },
  variants: {
    size: {
      sm: {
        boxSize: "3.5",
        borderRadius: "xs",
        fontSize: "3xs",
      },
      md: {
        boxSize: "4",
        borderRadius: "xs",
        fontSize: "2xs",
      },
      lg: {
        boxSize: "5",
        borderRadius: "sm",
        fontSize: "xs",
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
