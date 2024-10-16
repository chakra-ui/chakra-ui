import { defineRecipe } from "../../styled-system"

export const checkmarkRecipe = defineRecipe({
  className: "chakra-checkmark",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    verticalAlign: "top",
    color: "white",
    borderWidth: "1px",
    borderColor: "transparent",
    borderRadius: "xs",
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
      xs: {
        boxSize: "3",
      },
      sm: {
        boxSize: "4",
      },
      md: {
        boxSize: "5",
        p: "0.5",
      },
      lg: {
        boxSize: "6",
        p: "0.5",
      },
    },

    variant: {
      outline: {
        bg: "bg",
        borderWidth: "1px",
        borderColor: "border",
        "&:is([data-state=checked], [data-state=indeterminate])": {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "colorPalette.solid",
        },
      },
      subtle: {
        borderWidth: "1px",
        bg: "colorPalette.subtle",
        borderColor: "colorPalette.subtle",
        "&:is([data-state=checked], [data-state=indeterminate])": {
          color: "colorPalette.fg",
        },
      },
      plain: {
        "&:is([data-state=checked], [data-state=indeterminate])": {
          color: "colorPalette.fg",
        },
      },
      inverted: {
        bg: "bg",
        borderWidth: "1px",
        borderColor: "border",
        color: "colorPalette.fg",
        "&:is([data-state=checked], [data-state=indeterminate])": {
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
