import { tourAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tourSlotRecipe = defineSlotRecipe({
  slots: tourAnatomy.keys(),
  className: "tour",
  base: {
    backdrop: {
      position: "fixed",
      inset: "0",
      bg: "blackAlpha.600",
      zIndex: "overlay",
      _open: {
        animation: "fade-in",
      },
      _closed: {
        animation: "fade-out",
      },
    },

    spotlight: {
      position: "absolute",
      bg: "transparent",
      borderRadius: "l2",
      outline: "2px solid",
      outlineColor: "colorPalette.solid",
      outlineOffset: "2",
      zIndex: "overlay",
      pointerEvents: "none",
      _open: {
        animation: "fade-in",
      },
      _closed: {
        animation: "fade-out",
      },
    },

    positioner: {
      position: "absolute",
      zIndex: "popover",
      display: "flex",
      flexDirection: "column",
    },

    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "4",
      bg: "bg.panel",
      borderRadius: "l3",
      boxShadow: "lg",
      maxWidth: "sm",
      p: "6",
      _open: {
        animation: "fade-in, scale-in",
      },
      _closed: {
        animation: "fade-out, scale-out",
      },
    },

    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "colors.bg.panel",
    },

    arrowTip: {
      borderTopWidth: "1px",
      borderInlineStartWidth: "1px",
    },

    title: {
      fontWeight: "semibold",
      textStyle: "lg",
      color: "fg",
    },

    description: {
      color: "fg.muted",
      textStyle: "sm",
      lineHeight: "relaxed",
    },

    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "3",
      mt: "2",
    },

    progressText: {
      color: "fg.muted",
      textStyle: "sm",
      fontWeight: "medium",
    },

    actionTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "medium",
      textStyle: "sm",
      height: "9",
      minWidth: "9",
      px: "4",
      cursor: "button",
      borderRadius: "l2",
      transitionProperty: "background, border-color, color, box-shadow",
      transitionDuration: "normal",
      focusVisibleRing: "outside",
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },

    closeTrigger: {
      position: "absolute",
      top: "3",
      insetEnd: "3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "8",
      cursor: "button",
      color: "fg.muted",
      borderRadius: "l2",
      transitionProperty: "background, color",
      transitionDuration: "normal",
      focusVisibleRing: "inside",
      _hover: {
        bg: "bg.muted",
        color: "fg",
      },
      _icon: {
        boxSize: "4",
      },
    },
  },

  variants: {
    size: {
      sm: {
        content: {
          maxWidth: "xs",
          p: "4",
          gap: "3",
        },
        title: {
          textStyle: "md",
        },
        description: {
          textStyle: "xs",
        },
        actionTrigger: {
          height: "8",
          minWidth: "8",
          px: "3",
          textStyle: "xs",
        },
        closeTrigger: {
          boxSize: "7",
          top: "2",
          insetEnd: "2",
        },
      },
      md: {
        content: {
          maxWidth: "sm",
          p: "6",
          gap: "4",
        },
        title: {
          textStyle: "lg",
        },
        description: {
          textStyle: "sm",
        },
        actionTrigger: {
          height: "9",
          minWidth: "9",
          px: "4",
          textStyle: "sm",
        },
        closeTrigger: {
          boxSize: "8",
          top: "3",
          insetEnd: "3",
        },
      },
      lg: {
        content: {
          maxWidth: "md",
          p: "8",
          gap: "5",
        },
        title: {
          textStyle: "xl",
        },
        description: {
          textStyle: "md",
        },
        actionTrigger: {
          height: "10",
          minWidth: "10",
          px: "5",
          textStyle: "md",
        },
        closeTrigger: {
          boxSize: "9",
          top: "4",
          insetEnd: "4",
        },
      },
    },

    variant: {
      solid: {
        actionTrigger: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          _hover: {
            bg: "colorPalette.emphasized",
          },
          _pressed: {
            bg: "colorPalette.emphasized",
          },
        },
      },
      outline: {
        actionTrigger: {
          borderWidth: "1px",
          borderColor: "border",
          bg: "transparent",
          color: "fg",
          _hover: {
            bg: "bg.muted",
            borderColor: "border.emphasized",
          },
          _pressed: {
            bg: "bg.muted",
          },
        },
      },
      ghost: {
        actionTrigger: {
          bg: "transparent",
          color: "fg",
          _hover: {
            bg: "bg.muted",
          },
          _pressed: {
            bg: "bg.muted",
          },
        },
      },
      subtle: {
        actionTrigger: {
          bg: "bg.muted",
          color: "fg",
          _hover: {
            bg: "bg.subtle",
          },
          _pressed: {
            bg: "bg.subtle",
          },
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
