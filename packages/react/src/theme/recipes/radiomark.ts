import { defineRecipe } from "../../styled-system"

export const radiomarkRecipe = defineRecipe({
  className: "chakra-radiomark",
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
    cursor: "radio",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "colorPalette.focusRing",
      outlineOffset: "2px",
    },
    _invalid: {
      colorPalette: "red",
      borderColor: "red.500",
    },
    _disabled: {
      opacity: "0.5",
      cursor: "disabled",
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
      solid: {
        borderWidth: "1px",
        borderColor: "border",
        _checked: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "colorPalette.solid",
        },
      },

      subtle: {
        borderWidth: "1px",
        bg: "colorPalette.muted",
        borderColor: "colorPalette.muted",
        color: "transparent",
        _checked: {
          color: "colorPalette.fg",
        },
      },

      outline: {
        borderWidth: "1px",
        borderColor: "inherit",
        _checked: {
          color: "colorPalette.fg",
          borderColor: "colorPalette.solid",
        },
        "& .dot": {
          scale: "0.6",
        },
      },

      inverted: {
        bg: "bg",
        borderWidth: "1px",
        borderColor: "inherit",
        _checked: {
          color: "colorPalette.solid",
          borderColor: "currentcolor",
        },
      },
    },

    size: {
      xs: {
        boxSize: "3",
      },

      sm: {
        boxSize: "4",
      },

      md: {
        boxSize: "5",
      },

      lg: {
        boxSize: "6",
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
