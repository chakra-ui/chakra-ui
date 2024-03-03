import { defineRecipe } from "@chakra-ui/react"

export const inputRecipe = defineRecipe({
  base: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    "--focus-color": { base: "colors.blue.500", _dark: "colors.blue.300" },
    "--error-color": { base: "colors.red.500", _dark: "colors.red.300" },
  },
  variants: {
    size: {
      lg: {
        fontSize: "lg",
        padding: "4",
        borderRadius: "md",
        height: "12",
      },
      md: {
        fontSize: "md",
        padding: "4",
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
        bg: "inherit",
        _hover: {
          borderColor: { base: "gray.300", _dark: "whiteAlpha.400" },
        },
        _invalid: {
          borderColor: "var(--error-color)",
          boxShadow: `0 0 0 1px var(--error-color)`,
        },
        _focusVisible: {
          zIndex: 1,
          borderColor: "var(--focus-color)",
          boxShadow: `0 0 0 1px var(--focus-color)`,
        },
      },
      field: {
        border: "2px solid",
        borderColor: "transparent",
        bg: { base: "gray.100", _dark: "whiteAlpha.50" },
        _hover: {
          bg: { base: "gray.200", _dark: "whiteAlpha.100" },
        },
        _invalid: {
          borderColor: "var(--error-color)",
        },
        _focusVisible: {
          bg: "transparent",
          borderColor: "var(--focus-color)",
        },
      },
      flushed: {
        borderBottom: "1px solid",
        borderColor: "inherit",
        borderRadius: "0",
        px: "0",
        bg: "transparent",
        _invalid: {
          borderColor: "var(--error-color)",
          boxShadow: `0px 1px 0px 0px var(--error-color)`,
        },
        _focusVisible: {
          borderColor: "var(--focus-color)",
          boxShadow: `0px 1px 0px 0px var(--focus-color)`,
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
