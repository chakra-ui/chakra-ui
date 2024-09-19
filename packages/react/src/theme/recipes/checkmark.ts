import { defineRecipe } from "../../styled-system"

export const checkmarkRecipe = defineRecipe({
  className: "chakra-checkmark",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    verticalAlign: "top",
    color: "white",
    borderWidth: "1px",
    borderColor: "transparent",
    focusVisibleRing: "outside",
    _invalid: {
      colorPalette: "red",
      borderColor: "border.error",
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
        borderColor: "border",
        "&:is([data-checked], [data-indeterminate])": {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "colorPalette.solid",
        },
      },
      subtle: {
        borderWidth: "1px",
        bg: "colorPalette.subtle",
        borderColor: "colorPalette.subtle",
        "&:is([data-checked], [data-indeterminate])": {
          color: "colorPalette.fg",
        },
      },
      plain: {
        "&:is([data-checked], [data-indeterminate])": {
          color: "colorPalette.fg",
        },
      },
      inverted: {
        bg: "bg",
        borderWidth: "1px",
        borderColor: "border",
        color: "colorPalette.fg",
        "&:is([data-checked], [data-indeterminate])": {
          borderColor: "colorPalette.solid",
        },
      },
    },
  },

  defaultVariants: {
    variant: "outline",
    size: "md",
  },
})
