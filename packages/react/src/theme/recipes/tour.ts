import { tourAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tourSlotRecipe = defineSlotRecipe({
  slots: tourAnatomy.keys(),
  className: "tour",
  base: {
    backdrop: {
      inset: "0",
      bg: "blackAlpha.600",
      _open: { animationName: "fade-in", animationDuration: "slow" },
      _closed: { animationName: "fade-out", animationDuration: "moderate" },
    },
    content: {
      position: "relative",
      bg: "bg.panel",
      borderRadius: "l3",
      p: "6",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      maxW: "sm",
      _open: {
        animationName: "scale-in, fade-in",
        animationDuration: "moderate",
      },
      _closed: {
        animationName: "scale-out, fade-out",
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
  },
})
