import { defineRecipe } from "../../styled-system"

export const inputRecipe = defineRecipe({
  base: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    "--focus-color": "colors.blue.500",
    "--error-color": "colors.red.500",
  },
  variants: {
    size: {
      lg: {
        fontSize: "md",
        px: "4",
        py: "3",
        borderRadius: "md",
        height: "12",
      },
      md: {
        fontSize: "sm",
        px: "3",
        py: "2",
        borderRadius: "md",
        height: "10",
      },
      sm: {
        fontSize: "sm",
        padding: "3",
        borderRadius: "sm",
        height: "8",
      },
      xs: {
        fontSize: "xs",
        padding: "2",
        borderRadius: "sm",
        height: "6",
      },
    },
    variant: {
      outline: {
        border: "1px solid",
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
        border: "1px solid",
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
        borderBottom: "1px solid",
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
