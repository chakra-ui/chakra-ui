import { defineRecipe } from "../../styled-system"

export const inputRecipe = defineRecipe({
  className: "chakra-input",
  base: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    colorPalette: "gray",
    _disabled: {
      layerStyle: "disabled",
    },
    height: "var(--input-height)",
    "--focus-color": "colors.focusRing",
    "--error-color": "colors.border.error",
  },
  variants: {
    size: {
      lg: {
        textStyle: "md",
        px: "4",
        py: "3",
        borderRadius: "md",
        "--input-height": "sizes.12",
        scrollPaddingBottom: "3",
      },
      md: {
        textStyle: "sm",
        px: "3",
        py: "2",
        borderRadius: "md",
        "--input-height": "sizes.10",
        scrollPaddingBottom: "2",
      },
      sm: {
        textStyle: "sm",
        px: "3",
        py: "3",
        borderRadius: "sm",
        "--input-height": "sizes.8",
        scrollPaddingBottom: "3",
      },
      xs: {
        textStyle: "xs",
        px: "2",
        py: "2",
        borderRadius: "sm",
        "--input-height": "sizes.6",
        scrollPaddingBottom: "2",
      },
    },
    variant: {
      outline: {
        borderWidth: "1px",
        borderColor: "border",
        bg: "bg",
        focusVisibleRing: "inside",
        _invalid: {
          borderColor: "var(--error-color)",
        },
      },
      filled: {
        borderWidth: "1px",
        borderColor: "transparent",
        bg: "bg.muted",
        _invalid: {
          borderColor: "var(--error-color)",
        },
        _focusVisible: {
          bg: "bg",
          outline: "1px solid var(--focus-color)",
          borderColor: "var(--focus-color)",
        },
      },
      flushed: {
        borderBottomWidth: "1px",
        borderBottomColor: "border",
        borderRadius: "0",
        px: "0",
        bg: "bg",
        _invalid: {
          borderColor: "var(--error-color)",
        },
        _focusVisible: {
          borderColor: "var(--focus-color)",
          boxShadow: "0px 1px 0px 0px var(--focus-color)",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
