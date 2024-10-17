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
      "--hovercard-bg": "colors.bg.panel",
      bg: "var(--hovercard-bg)",
      boxShadow: "lg",
      maxWidth: "80",
      borderRadius: "l3",
      zIndex: "popover",
      transformOrigin: "var(--transform-origin)",
      outline: "0",
      _open: {
        animationStyle: "slide-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "slide-fade-out",
        animationDuration: "faster",
      },
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "var(--hovercard-bg)",
    },
    arrowTip: {
      borderTopWidth: "0.5px",
      borderInlineStartWidth: "0.5px",
    },
  },

  variants: {
    size: {
      xs: {
        content: {
          padding: "3",
        },
      },
      sm: {
        content: {
          padding: "4",
        },
      },
      md: {
        content: {
          padding: "5",
        },
      },
      lg: {
        content: {
          padding: "6",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
