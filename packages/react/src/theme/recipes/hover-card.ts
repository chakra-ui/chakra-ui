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
      borderRadius: "var(--hovercard-radius)",
      zIndex: "inherit",
      transformOrigin: "var(--transform-origin)",
      outline: 0,
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "moderate",
        animationTimingFunction: "ease-out",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
        animationTimingFunction: "ease-in",
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
          "--hovercard-radius": "radii.sm",
        },
      },
      sm: {
        content: {
          "--hovercard-padding": "spacing.4",
          "--hovercard-radius": "radii.sm",
        },
      },
      md: {
        content: {
          "--hovercard-padding": "spacing.5",
          "--hovercard-radius": "radii.md",
        },
      },
      lg: {
        content: {
          "--hovercard-padding": "spacing.6",
          "--hovercard-radius": "radii.lg",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
