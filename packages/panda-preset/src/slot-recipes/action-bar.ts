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
      justifyContent: "center",
      pointerEvents: "none",
      insetInline: "0",
      top: "unset",
      bottom: "calc(env(safe-area-inset-bottom) + 20px)",
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
      _open: {
        animationName: "slide-from-bottom, fade-in",
        animationDuration: "moderate",
      },
      _closed: {
        animationName: "slide-to-bottom, fade-out",
        animationDuration: "faster",
      },
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
})
