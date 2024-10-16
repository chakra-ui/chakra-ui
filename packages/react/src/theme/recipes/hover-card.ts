import { hoverCardAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const hoverCardSlotRecipe = defineSlotRecipe({
  className: "chakra-hover-card",
  slots: hoverCardAnatomy.keys(),
  base: {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      textStyle: "sm",
      paddingInline: "var(--hovercard-padding)",
      paddingBlock: "var(--hovercard-padding)",
      "--hovercard-bg": "colors.bg.panel",
      bg: "var(--hovercard-bg)",
      shadow: "md",
      width: "xs",
      borderRadius: "l3",
      zIndex: "popover",
      transformOrigin: "var(--transform-origin)",
      outline: "0",
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
      },
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "var(--hovercard-bg)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderInlineStartWidth: "1px",
    },
  },

  variants: {
    size: {
      xs: {
        content: {
          "--hovercard-padding": "spacing.3",
        },
      },
      sm: {
        content: {
          "--hovercard-padding": "spacing.4",
        },
      },
      md: {
        content: {
          "--hovercard-padding": "spacing.5",
        },
      },
      lg: {
        content: {
          "--hovercard-padding": "spacing.6",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
