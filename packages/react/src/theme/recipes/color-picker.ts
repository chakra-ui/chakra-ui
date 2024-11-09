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
      "--thumb-size": "sizes.4",
      "--swatch-size": "sizes.6",
    },
    label: {
      color: "fg",
      fontWeight: "medium",
      textStyle: "sm",
    },
    valueText: {
      textAlign: "start",
    },
    control: {
      display: "flex",
      flexDirection: "row",
      gap: "2",
    },
    trigger: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2",
      textStyle: "sm",
      focusRing: "outside",
      borderWidth: "1px",
      minH: "8",
      px: "1",
      rounded: "l2",
      _disabled: {
        opacity: "0.5",
      },
    },
    content: {
      "--thumb-size": "sizes.4.5",
      "--swatch-size": "sizes.6",
      "--slider-height": "sizes.5",
      display: "flex",
      flexDirection: "column",
      bg: "bg.panel",
      borderRadius: "l3",
      boxShadow: "lg",
      width: "240px",
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
      height: "180px",
      borderRadius: "l2",
      overflow: "hidden",
    },
    areaThumb: {
      borderRadius: "full",
      height: "var(--thumb-size)",
      width: "var(--thumb-size)",
      borderWidth: "0.25rem",
      borderColor: "white",
      shadow: "sm",
      outline: "none",
    },
    areaBackground: {
      height: "full",
    },
    channelSlider: {
      borderRadius: "l2",
    },
    channelSliderTrack: {
      height: "var(--slider-height)",
      borderRadius: "inherit",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
    },
    swatchGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(var(--swatch-per-row, 7), 1fr)",
      gap: "2",
    },
    swatch: {
      height: "var(--swatch-size)",
      width: "var(--swatch-size)",
      borderRadius: "l1",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    swatchIndicator: {
      color: "white",
    },
    channelSliderThumb: {
      borderRadius: "full",
      height: "var(--thumb-size)",
      width: "var(--thumb-size)",
      borderWidth: "0.25rem",
      borderColor: "white",
      shadow: "sm",
      transform: "translate(-50%, -50%)",
      outline: "none",
    },
    transparencyGrid: {
      borderRadius: "l2",
    },
  },

  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },

  defaultVariants: {
    size: "md",
  },
})
