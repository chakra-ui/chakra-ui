import { defineRecipe } from "../../styled-system"

export const buttonRecipe = defineRecipe({
  className: "chakra-button",
  base: {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    cursor: "button",
    flexShrink: "0",
    outline: "0",
    lineHeight: "1.2",
    isolation: "isolate",
    fontWeight: "medium",
    transitionProperty: "common",
    transitionDuration: "moderate",
    focusVisibleRing: "outside",
    _disabled: {
      layerStyle: "disabled",
    },
    _icon: {
      fontSize: "1em",
      flexShrink: 0,
    },
  },

  variants: {
    size: {
      xs: {
        gap: "1",
        h: "6",
        minW: "6",
        textStyle: "xs",
        borderRadius: "sm",
        px: "2",
      },
      sm: {
        gap: "2",
        h: "8",
        minW: "8",
        textStyle: "sm",
        borderRadius: "sm",
        px: "3",
      },
      md: {
        gap: "2",
        h: "10",
        minW: "10",
        borderRadius: "md",
        textStyle: "sm",
        px: "4",
      },
      lg: {
        gap: "3",
        h: "12",
        minW: "12",
        borderRadius: "lg",
        textStyle: "md",
        px: "5",
      },
    },

    variant: {
      solid: {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
        _hover: {
          bg: "colorPalette.solid/90",
        },
        _expanded: {
          bg: "colorPalette.solid/90",
        },
      },

      subtle: {
        bg: "colorPalette.muted",
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.subtle",
        },
        _expanded: {
          bg: "colorPalette.subtle",
        },
      },

      surface: {
        bg: "colorPalette.muted",
        color: "colorPalette.fg",
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.emphasized",
        _hover: {
          bg: "colorPalette.subtle",
        },
        _expanded: {
          bg: "colorPalette.subtle",
        },
      },

      outline: {
        borderWidth: "1px",
        borderColor: "colorPalette.emphasized",
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.muted",
        },
        _expanded: {
          bg: "colorPalette.muted",
        },
      },

      ghost: {
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.muted",
        },
        _expanded: {
          bg: "colorPalette.muted",
        },
      },

      plain: {
        color: "colorPalette.fg",
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
