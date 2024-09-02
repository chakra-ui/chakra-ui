import { popoverAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const popoverSlotRecipe = defineSlotRecipe({
  className: "chakra-popover",
  slots: popoverAnatomy.keys(),
  base: {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      textStyle: "sm",
      "--popover-bg": "colors.bg.panel",
      bg: "var(--popover-bg)",
      shadow: "md",
      width: "xs",
      borderRadius: "var(--popover-radius)",
      zIndex: "popover",
      outline: 0,
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
      },
    },
    header: {
      paddingInline: "var(--popover-padding)",
      paddingTop: "var(--popover-padding)",
    },
    body: {
      padding: "var(--popover-padding)",
      flex: "1 1 0%",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      paddingInline: "var(--popover-padding)",
      paddingBottom: "var(--popover-padding)",
    },
    closeTrigger: {
      position: "absolute!",
      top: "1",
      insetEnd: "1",
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "var(--popover-bg)",
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
          "--popover-padding": "spacing.3",
          "--popover-radius": "radii.sm",
        },
      },
      sm: {
        content: {
          "--popover-padding": "spacing.4",
          "--popover-radius": "radii.sm",
        },
      },
      md: {
        content: {
          "--popover-padding": "spacing.5",
          "--popover-radius": "radii.md",
        },
      },
      lg: {
        content: {
          "--popover-padding": "spacing.6",
          "--popover-radius": "radii.lg",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
