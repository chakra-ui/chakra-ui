import { splitterAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const splitterSlotRecipe = defineSlotRecipe({
  slots: splitterAnatomy.keys(),
  className: "splitter",
  base: {
    root: {
      display: "flex",
      gap: "0",
      overflow: "hidden",
    },

    panel: {
      display: "flex",
      overflow: "auto",
    },

    resizeTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
      flexShrink: "0",
      bg: "border",
      cursor: "col-resize",
      position: "relative",
      transitionProperty: "background",
      transitionDuration: "normal",
      _horizontal: {
        cursor: "col-resize",
        width: "1",
        minWidth: "1",
      },
      _vertical: {
        cursor: "row-resize",
        height: "1",
        minHeight: "1",
      },
      _hover: {
        bg: "border.emphasized",
      },
      _focus: {
        bg: "colorPalette.solid",
      },
      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
  },

  variants: {
    size: {
      sm: {
        resizeTrigger: {
          _horizontal: {
            width: "0.5",
            minWidth: "0.5",
          },
          _vertical: {
            height: "0.5",
            minHeight: "0.5",
          },
        },
      },
      md: {
        resizeTrigger: {
          _horizontal: {
            width: "1",
            minWidth: "1",
          },
          _vertical: {
            height: "1",
            minHeight: "1",
          },
        },
      },
      lg: {
        resizeTrigger: {
          _horizontal: {
            width: "1.5",
            minWidth: "1.5",
          },
          _vertical: {
            height: "1.5",
            minHeight: "1.5",
          },
        },
      },
    },

    variant: {
      solid: {
        resizeTrigger: {
          bg: "border",
          _hover: {
            bg: "border.emphasized",
          },
          _focus: {
            bg: "colorPalette.solid",
          },
        },
      },
      subtle: {
        resizeTrigger: {
          bg: "transparent",
          _hover: {
            bg: "bg.subtle",
          },
          _focus: {
            bg: "colorPalette.subtle",
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
