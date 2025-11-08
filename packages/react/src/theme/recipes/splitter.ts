import { splitterAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const splitterSlotRecipe = defineSlotRecipe({
  slots: splitterAnatomy.keys(),
  className: "splitter",
  base: {
    root: {
      gap: "2",
      alignItems: "center",
      _vertical: {
        height: "650px !important",
      },
    },
    panel: {
      _vertical: {
        width: "100%",
      },
    },
    resizeTrigger: {
      bg: "colorPalette.emphasized",
      _horizontal: {
        width: "1",
        height: "20",
      },
      _vertical: {
        height: "1",
        width: "20",
      },
    },
  },
})
