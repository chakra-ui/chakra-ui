import { popoverAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

const anatomy = popoverAnatomy.extendWith("header", "body", "footer")

export const popoverSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontSize: "sm",
      "--popover-bg": "colors.bg.panel",
      bg: "var(--popover-bg)",
      shadow: "md",
      width: "xs",
      borderRadius: "var(--popover-radius)",
      zIndex: "popover",
      outline: 0,
      "--enter-opacity": "1",
      "--enter-scale": "0.95",
      "--exit-opacity": "0",
      "--exit-scale": "0.95",
      transformOrigin: "var(--transform-origin)",
      _open: {
        animation: "enter 0.2s cubic-bezier(0, 0, 0.2, 1)",
      },
      _closed: {
        animation: "exit 0.1s cubic-bezier(0.4, 0, 1, 1)",
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
