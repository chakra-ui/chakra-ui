import { colorPickerAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const colorPickerSlotRecipe = defineSlotRecipe({
  className: "colorPicker",
  slots: colorPickerAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    label: {
      color: "fg",
      fontWeight: "medium",
      textStyle: "sm",
    },
    control: {
      display: "flex",
      flexDirection: "row",
      gap: "2",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      bg: "bg",
      borderRadius: "l3",
      boxShadow: "lg",
      maxWidth: "sm",
      p: "4",
      zIndex: "dropdown",
      _open: {
        animationStyle: "slide-fade-in",
        animationDuration: "fast",
      },
      _closed: {
        animationStyle: "slide-fade-out",
        animationDuration: "faster",
      },
    },
    area: {
      height: "36",
      borderRadius: "l2",
      overflow: "hidden",
    },
    areaThumb: {
      borderRadius: "full",
      height: "2.5",
      width: "2.5",
      boxShadow: "white 0px 0px 0px 2px, black 0px 0px 2px 1px",
      outline: "none",
    },
    areaBackground: {
      height: "full",
    },
    channelSlider: {
      borderRadius: "l2",
    },
    channelSliderTrack: {
      height: "3",
      borderRadius: "l2",
    },
    swatchGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "2",
      bg: "bg",
    },
    swatch: {
      height: "6",
      width: "6",
      borderRadius: "l2",
      boxShadow:
        "0 0 0 1px {colors.border.emphasized}, 0 0 0 2px {colors.bg} inset",
    },
    channelSliderThumb: {
      borderRadius: "full",
      height: "2.5",
      width: "2.5",
      boxShadow: "white 0px 0px 0px 2px, black 0px 0px 2px 1px",
      transform: "translate(-50%, -50%)",
      outline: "none",
    },
    transparencyGrid: {
      borderRadius: "l2",
    },
  },
})
