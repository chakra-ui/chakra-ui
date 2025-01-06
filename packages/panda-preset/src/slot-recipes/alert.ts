import { defineSlotRecipe } from "../def"

export const alertSlotRecipe = defineSlotRecipe({
  slots: ["title", "description", "root", "indicator", "content"],
  className: "alert",
  base: {
    root: {
      width: "full",
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
      borderRadius: "l3",
    },
    title: {
      fontWeight: "medium",
    },
    description: {
      display: "inline",
    },
    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      width: "1em",
      height: "1em",
      _icon: {
        boxSize: "full",
      },
    },
    content: {
      display: "flex",
      flex: "1",
      gap: "1",
    },
  },
  variants: {
    status: {
      info: {
        root: {
          colorPalette: "blue",
        },
      },
      warning: {
        root: {
          colorPalette: "orange",
        },
      },
      success: {
        root: {
          colorPalette: "green",
        },
      },
      error: {
        root: {
          colorPalette: "red",
        },
      },
      neutral: {
        root: {
          colorPalette: "gray",
        },
      },
    },
    inline: {
      true: {
        content: {
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
        },
      },
      false: {
        content: {
          display: "flex",
          flexDirection: "column",
        },
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
          bg: "colorPalette.subtle",
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
        },
        indicator: {
          color: "colorPalette.fg",
        },
      },
      outline: {
        root: {
          color: "colorPalette.fg",
          shadow: "inset 0 0 0px 1px var(--shadow-color)",
          shadowColor: "colorPalette.muted",
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
          textStyle: "xs",
        },
        indicator: {
          textStyle: "lg",
        },
      },
      md: {
        root: {
          gap: "3",
          px: "4",
          py: "4",
          textStyle: "sm",
        },
        indicator: {
          textStyle: "xl",
        },
      },
      lg: {
        root: {
          gap: "3",
          px: "4",
          py: "4",
          textStyle: "md",
        },
        indicator: {
          textStyle: "2xl",
        },
      },
    },
  },
  defaultVariants: {
    status: "info",
    variant: "subtle",
    size: "md",
    inline: false,
  },
})
