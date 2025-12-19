import { defineSlotRecipe } from "../def"

export const actionBarSlotRecipe = defineSlotRecipe({
  className: "action-bar",
  slots: [
    "positioner",
    "content",
    "separator",
    "selectionTrigger",
    "closeTrigger",
  ],
  base: {
    positioner: {
      position: "fixed",
      display: "flex",
      pointerEvents: "none",
      insetInline: "0",
      "--action-bar-offset": "spacing.4",
    },
    content: {
      bg: "bg.panel",
      shadow: "md",
      display: "flex",
      alignItems: "center",
      gap: "3",
      borderRadius: "l3",
      py: "2.5",
      px: "3",
      pointerEvents: "auto",
      translate: "calc(-1 * var(--scrollbar-width) / 2) 0px",
    },
    separator: {
      width: "1px",
      height: "5",
      bg: "border",
    },
    selectionTrigger: {
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      alignSelf: "stretch",
      textStyle: "sm",
      px: "4",
      py: "1",
      borderRadius: "l2",
      borderWidth: "1px",
      borderStyle: "dashed",
    },
  },
  variants: {
    placement: {
      bottom: {
        positioner: {
          bottom:
            "calc(env(safe-area-inset-bottom) + var(--action-bar-offset))",
          justifyContent: "center",
        },
        content: {
          _open: {
            animationName: "slide-from-bottom, fade-in",
            animationDuration: "moderate",
          },
          _closed: {
            animationName: "slide-to-bottom, fade-out",
            animationDuration: "faster",
          },
        },
      },
      "bottom-start": {
        positioner: {
          bottom:
            "calc(env(safe-area-inset-bottom) + var(--action-bar-offset))",
          justifyContent: "flex-start",
          ps: "var(--action-bar-offset)",
        },
        content: {
          _open: {
            animationName: "slide-from-bottom, fade-in",
            animationDuration: "moderate",
          },
          _closed: {
            animationName: "slide-to-bottom, fade-out",
            animationDuration: "faster",
          },
        },
      },
      "bottom-end": {
        positioner: {
          bottom:
            "calc(env(safe-area-inset-bottom) + var(--action-bar-offset))",
          justifyContent: "flex-end",
          pe: "var(--action-bar-offset)",
        },
        content: {
          _open: {
            animationName: "slide-from-bottom, fade-in",
            animationDuration: "moderate",
          },
          _closed: {
            animationName: "slide-to-bottom, fade-out",
            animationDuration: "faster",
          },
        },
      },
    },
  },
  defaultVariants: {
    placement: "bottom",
  },
})
