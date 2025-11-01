import { splitterAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const splitterSlotRecipe = defineSlotRecipe({
  slots: splitterAnatomy.keys(),
  className: "splitter",
  base: {
    root: {
      display: "flex",
      gap: "3",
      overflow: "hidden",
      _horizontal: {
        alignItems: "center",
      },
      _vertical: {
        height: "600px !important",
        alignItems: "center",
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
      bg: "fg.subtle",
      cursor: "col-resize",
      position: "relative",
      transitionProperty: "background",
      transitionDuration: "normal",
      _horizontal: {
        cursor: "col-resize",
        width: "1",
        height: "80px",
      },
      _vertical: {
        cursor: "row-resize",
        height: "1",
        width: "80px",
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
})
