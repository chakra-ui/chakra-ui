import { defineSlotRecipe } from "../def"

export const tourSlotRecipe = defineSlotRecipe({
  slots: [
    "content",
    "actionTrigger",
    "closeTrigger",
    "progressText",
    "title",
    "description",
    "positioner",
    "arrow",
    "arrowTip",
    "backdrop",
    "spotlight",
    "control",
  ],
  className: "tour",
  base: {
    positioner: {
      "--tour-z-index": "zIndex.popover",
      "&[data-type=dialog], &[data-type=floating]": {
        display: "flex",
        position: "fixed",
        inset: "0",
        zIndex: "calc(var(--tour-z-index) + var(--tour-layer, 0))",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      },
      "&[data-type=floating]": {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        p: "4",
      },
    },
    backdrop: {
      "--tour-z-index": "zIndex.popover",
      zIndex: "calc(var(--tour-z-index) + var(--tour-layer, 0))",
      bg: "blackAlpha.500",
      "&[data-type=floating]": {
        position: "fixed",
      },
      _open: {
        animationName: "fade-in",
        animationDuration: "slow",
      },
    },
    spotlight: {
      "--tour-z-index": "zIndex.popover",
      zIndex: "calc(var(--tour-z-index) + var(--tour-layer, 0))",
      borderWidth: "3px",
      borderColor: "bg.panel",
      boxShadow: "lg",
      transitionProperty: "left, top, width, height",
      transitionDuration: "moderate",
      transitionTimingFunction: "default",
    },
    content: {
      "--tour-bg": "colors.bg.panel",
      "--tour-mobile-size": "calc(100dvw - 2rem)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      width: {
        base: "min(var(--tour-mobile-size), var(--tour-size))",
        sm: "var(--tour-size)",
      },
      maxHeight: "var(--available-height, calc(100dvh - 2rem))",
      p: "var(--tour-padding)",
      bg: "var(--tour-bg)",
      borderRadius: "l3",
      boxShadow: "lg",
      outline: "0",
      pointerEvents: "auto",
      transformOrigin: "var(--transform-origin)",
      _open: {
        animationStyle: "scale-fade-in",
        animationDuration: "moderate",
      },
      _closed: {
        animationStyle: "scale-fade-out",
        animationDuration: "faster",
      },
    },
    title: {
      fontWeight: "semibold",
      textStyle: "md",
      pe: "6",
    },
    description: {
      color: "fg.muted",
      textStyle: "sm",
      minHeight: "0",
      overflowY: "auto",
    },
    progressText: {
      color: "fg.muted",
      textStyle: "xs",
      me: "auto",
    },
    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "2",
      mt: "3",
    },
    closeTrigger: {
      position: "absolute",
      top: "2",
      insetEnd: "2",
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "var(--tour-bg)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
    },
  },
  variants: {
    size: {
      sm: {
        content: {
          "--tour-size": "sizes.xs",
          "--tour-padding": "spacing.4",
        },
      },
      md: {
        content: {
          "--tour-size": "sizes.sm",
          "--tour-padding": "spacing.5",
        },
      },
      lg: {
        content: {
          "--tour-size": "sizes.md",
          "--tour-padding": "spacing.6",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
