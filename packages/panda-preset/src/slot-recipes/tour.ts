import { defineSlotRecipe } from "../def"

export const tourSlotRecipe = defineSlotRecipe({
  slots: [
    "control",
    "content",
    "positioner",
    "title",
    "actionTrigger",
    "closeTrigger",
    "progressText",
    "description",
    "arrow",
    "arrowTip",
    "backdrop",
    "spotlight",
  ],
  className: "tour",
  base: {
    backdrop: {
      bg: "blackAlpha.500",
      zIndex: "var(--tour-z-index, 1400)",
      _open: {
        animationName: "fade-in",
        animationDuration: "slow",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "moderate",
      },
    },
    content: {
      position: "relative",
      bg: "bg.panel",
      borderRadius: "l3",
      p: "6",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: "2",
      zIndex: "calc(var(--tour-z-index, 1400) + 1)",
      boxShadow: "lg",
      _open: {
        animationDuration: "moderate",
      },
      _closed: {
        animationDuration: "faster",
      },
    },
    title: {
      fontWeight: "semibold",
      textStyle: "lg",
    },
    description: {
      color: "fg.muted",
    },
    progressText: {
      color: "fg.muted",
      textStyle: "sm",
    },
    control: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "3",
      mt: "4",
    },
    spotlight: {
      border: "3px solid var(--colors-bg.panel)",
      boxShadow: "lg",
      borderRadius: "l3",
    },
    actionTrigger: {
      px: "5",
      py: "1",
      borderRadius: "l2",
      cursor: "button",
      border: "1px solid",
      borderColor: "colorPalette.muted",
    },
    closeTrigger: {
      position: "absolute",
      right: "3",
      top: "3",
      cursor: "button",
      _icon: { boxSize: "4" },
    },
    arrow: {
      "--arrow-size": "sizes.3",
      "--arrow-background": "colors.bg.panel",
    },
    arrowTip: { borderTopWidth: "1px", borderInlineStartWidth: "1px" },
  },
})
