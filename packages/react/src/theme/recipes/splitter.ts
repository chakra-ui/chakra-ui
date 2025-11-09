import { splitterAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const splitterSlotRecipe = defineSlotRecipe({
  slots: splitterAnatomy.keys(),
  className: "splitter",
  base: {
    root: {
      gap: "2",
    },
    panel: {
      width: "100%",
    },
    resizeTrigger: {
      bg: "colorPalette.emphasized",
      _horizontal: {
        minWidth: "1.5",
      },
      _vertical: {
        minHeight: "1.5",
      },
      _disabled: {
        opacity: 0.5,
      },
    },
  },
})
