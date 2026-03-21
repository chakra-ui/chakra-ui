import { tourAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tourSlotRecipe = defineSlotRecipe({
  slots: tourAnatomy.keys(),
  className: "tour",
  base: {
    positioner: {
      "&[data-type=dialog], &[data-type=floating]": {
        display: "flex",
        width: "100dvw",
        height: "100dvh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: "calc(var(--tour-z-index, 1400) + 1)",
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
      width: "sm",
      flexDirection: "column",
      gap: "2",
      zIndex: "calc(var(--tour-z-index, 1400) + 1)",
      boxShadow: "lg",
      pointerEvents: "auto",
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
