import { tooltipAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: tooltipAnatomy.keys(),
  base: {
    content: {
      "--tooltip-bg": "colors.bg.inverted",
      bg: "var(--tooltip-bg)",
      color: "fg.inverted",
      px: "2",
      py: "0.5",
      borderRadius: "sm",
      fontWeight: "medium",
      fontSize: "xs",
      boxShadow: "md",
      maxW: "xs",
      zIndex: "tooltip",
      "--enter-opacity": "0",
      "--enter-scale": "0.95",
      "--exit-opacity": "0",
      "--exit-scale": "0.95",
      _open: {
        animation: "enter 0.1s",
      },
      _closed: {
        animation: "exit 0.1s",
      },
    },
    arrow: {
      "--arrow-size": "sizes.2",
      "--arrow-background": "var(--tooltip-bg)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderInlineStartWidth: "1px",
      borderColor: "var(--tooltip-bg)",
    },
  },
})
