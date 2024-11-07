import { defineRecipe } from "../../styled-system"

export const checkmarkRecipe = defineRecipe({
  className: "chakra-checkmark",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    color: "white",
    borderWidth: "1px",
    borderColor: "transparent",
    borderRadius: "l1",
    focusVisibleRing: "outside",
    _icon: {
      boxSize: "full",
    },
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
      solid: {
        borderColor: "border",
        "&:is([data-state=checked], [data-state=indeterminate])": {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "colorPalette.solid",
        },
      },
      outline: {
        borderColor: "border",
        "&:is([data-state=checked], [data-state=indeterminate])": {
          color: "colorPalette.fg",
          borderColor: "colorPalette.solid",
        },
      },
      subtle: {
        bg: "colorPalette.muted",
        borderColor: "colorPalette.muted",
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
        borderColor: "border",
        color: "colorPalette.fg",
        "&:is([data-state=checked], [data-state=indeterminate])": {
          borderColor: "colorPalette.solid",
        },
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
