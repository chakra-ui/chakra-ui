import { defineSlotRecipe } from "../def"

export const splitterSlotRecipe = defineSlotRecipe({
  slots: ["root", "panel", "resizeTrigger"],
  className: "splitter",
  base: {
    root: {
      display: "flex",
      gap: "0",
      overflow: "hidden",
      _vertical: {
        height: "600px !important",
      },
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
      bg: "bg.muted",
      cursor: "col-resize",
      position: "relative",
      transitionProperty: "background",
      transitionDuration: "normal",
      _horizontal: {
        cursor: "col-resize",
        width: "1",
      },
      _vertical: {
        cursor: "row-resize",
        height: "1",
      },
      _hover: {
        bg: "border.emphasized",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.solid",
        outlineOffset: "2px",
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
          },
          _vertical: {
            height: "0.5",
          },
        },
      },
      md: {
        resizeTrigger: {
          _horizontal: {
            width: "1",
          },
          _vertical: {
            height: "1",
          },
        },
      },
      lg: {
        resizeTrigger: {
          _horizontal: {
            width: "1.5",
          },
          _vertical: {
            height: "1.5",
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
        },
      },
      subtle: {
        resizeTrigger: {
          bg: "transparent",
          _hover: {
            bg: "bg.muted",
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
