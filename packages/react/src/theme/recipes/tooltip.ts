import { tooltipAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: tooltipAnatomy.keys(),
  base: {
    content: {
      "--tooltip-bg": "colors.bg.inverted",
      bg: "var(--tooltip-bg)",
      color: "fg.inverted",
      px: "2.5",
      py: "1.5",
      borderRadius: "md",
      fontWeight: "medium",
      fontSize: "xs",
      boxShadow: "md",
      maxW: "xs",
      zIndex: "tooltip",
      _open: {
        motionStyle: "scale-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        motionStyle: "scale-fade-out",
        animationDuration: "fast",
      },
    },
    arrow: {
      "--arrow-size": "sizes.2",
      "--arrow-bg": "var(--tooltip-bg)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderInlineStartWidth: "1px",
      borderColor: "var(--tooltip-bg)",
    },
  },
})
