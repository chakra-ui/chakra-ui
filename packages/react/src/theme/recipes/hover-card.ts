import { hoverCardAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const hoverCardSlotRecipe = defineSlotRecipe({
  slots: hoverCardAnatomy.keys(),
  base: {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontSize: "sm",
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
        motionStyle: "scale-fade-in",
        animationDuration: "normal",
        // TODO: tokenize
        animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      },
      _closed: {
        motionStyle: "scale-fade-out",
        animationDuration: "faster",
        // TODO: tokenize
        animationTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
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
