import { hoverCardAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const hoverCardSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
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
      _focusVisible: {
        outline: 0,
      },
      _open: {
        "--enter-opacity": "1",
        "--enter-scale": "0.95",
        animation: "enter 0.2s cubic-bezier(0, 0, 0.2, 1)",
      },
      _closed: {
        "--exit-opacity": "0",
        "--exit-scale": "0.95",
        animation: "exit 0.1s cubic-bezier(0.4, 0, 1, 1)",
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
