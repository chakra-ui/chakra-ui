import { alertAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const alertSlotRecipe = defineSlotRecipe({
  slots: alertAnatomy.keys(),
  className: "chakra-alert",

  base: {
    root: {
      width: "full",
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
    },
    title: {
      fontWeight: "medium",
      lineHeight: "1.3",
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
      neutral: {
        root: { colorPalette: "gray" },
      },
    },

    variant: {
      subtle: {
        root: {
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
        },
      },

      surface: {
        root: {
          bg: "colorPalette.muted",
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.emphasized",
        },
        indicator: {
          color: "colorPalette.fg",
        },
      },

      outline: {
        root: {
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.emphasized",
        },
        indicator: {
          color: "colorPalette.fg",
        },
      },

      solid: {
        root: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
        },
        indicator: {
          color: "colorPalette.contrast",
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
