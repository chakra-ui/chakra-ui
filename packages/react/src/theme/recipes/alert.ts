import { alertAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const alertSlotRecipe = defineSlotRecipe({
  slots: alertAnatomy.keys(),

  base: {
    root: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      fontWeight: "medium",
      lineHeight: "1.2",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      lineHeight: "1.5",
    },
    indicator: {
      display: "inherit",
      flexShrink: 0,
    },
  },

  variants: {
    status: {
      info: {
        root: { colorPalette: "blue" },
      },
      warning: {
        root: { colorPalette: "orange" },
      },
      success: {
        root: { colorPalette: "green" },
      },
      error: {
        root: { colorPalette: "red" },
      },
    },

    variant: {
      subtle: {
        root: {
          bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        },
        indicator: {
          color: { base: "colorPalette.800", _dark: "colorPalette.400" },
        },
      },

      outline: {
        root: {
          bg: { base: "colorPalette.50", _dark: "colorPalette.400/10" },
          shadowColor: {
            base: "colorPalette.300",
            _dark: "colorPalette.200/10",
          },
          color: { base: "colorPalette.800", _dark: "colorPalette.200" },
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
        },
        indicator: {
          color: { base: "colorPalette.800", _dark: "colorPalette.400" },
        },
      },

      solid: {
        root: {
          bg: "colorPalette.600",
          color: "white",
        },
        indicator: {
          color: "white",
        },
      },
    },

    size: {
      sm: {
        root: {
          gap: "2",
          px: "3",
          py: "3",
          rounded: "md",
          fontSize: "xs",
        },
        indicator: {
          fontSize: "md",
        },
      },
      md: {
        root: {
          gap: "3",
          px: "4",
          py: "4",
          rounded: "md",
          fontSize: "sm",
        },
        indicator: {
          fontSize: "lg",
        },
      },
      lg: {
        root: {
          gap: "3",
          px: "4",
          py: "4",
          rounded: "lg",
          fontSize: "md",
        },
        indicator: {
          fontSize: "lg",
        },
      },
    },
  },

  defaultVariants: {
    status: "info",
    variant: "subtle",
    size: "md",
  },
})
