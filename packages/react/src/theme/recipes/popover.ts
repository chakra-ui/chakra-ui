import { popoverAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const popoverSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
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
      zIndex: "inherit",
      _focusVisible: {
        outline: 0,
      },
    },
    arrow: {
      "--popper-arrow-bg": "var(--popover-bg)",
      "--popper-arrow-size": "8px",
      "--popper-arrow-shadow-color": {
        base: "colors.gray.200",
        _dark: "colors.whiteAlpha.300",
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
      position: "absolute",
      top: "1",
      insetEnd: "1",
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
