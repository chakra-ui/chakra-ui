import { defineRecipe } from "../../styled-system"

export const inputRecipe = defineRecipe({
  className: "input",
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
    "--focus-color": "colors.focusRing",
    "--error-color": "colors.border.error",
  },
  variants: {
    size: {
      lg: {
        fontSize: "md",
        px: "4",
        py: "3",
        borderRadius: "md",
        height: "12",
        scrollPaddingBottom: "3",
      },
      md: {
        fontSize: "sm",
        px: "3",
        py: "2",
        borderRadius: "md",
        height: "10",
        scrollPaddingBottom: "2",
      },
      sm: {
        fontSize: "sm",
        px: "3",
        py: "3",
        borderRadius: "sm",
        height: "8",
        scrollPaddingBottom: "3",
      },
      xs: {
        fontSize: "xs",
        px: "2",
        py: "2",
        borderRadius: "sm",
        height: "6",
        scrollPaddingBottom: "2",
      },
    },
    variant: {
      outline: {
        borderWidth: "1px",
        borderColor: "inherit",
        bg: "bg",
        _invalid: {
          borderColor: "var(--error-color)",
        },
        _focusVisible: {
          outline: "1px solid var(--focus-color)",
          borderColor: "var(--focus-color)",
        },
      },
      filled: {
        borderWidth: "1px",
        borderColor: "transparent",
        bg: { base: "gray.100", _dark: "gray.800" },
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
        borderBottomWith: "1px",
        borderColor: "inherit",
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
