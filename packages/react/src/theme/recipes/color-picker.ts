import { colorPickerAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { colorSwatchRecipe } from "./color-swatch"
import { inputRecipe } from "./input"

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
    valueText: {
      textAlign: "start",
    },
    control: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: "2",
      position: "relative",
    },
    swatchTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexShrink: "0",
      gap: "2",
      textStyle: "sm",
      minH: "var(--input-height)",
      minW: "var(--input-height)",
      px: "1",
      rounded: "l2",
      _disabled: { opacity: "0.5" },
      "--focus-color": "colors.colorPalette.focusRing",
      "&:focus-visible": {
        borderColor: "var(--focus-color)",
        outline: "1px solid var(--focus-color)",
      },
      "&[data-fit-content]": {
        "--input-height": "unset",
        px: "0",
        border: "0",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      bg: "bg.panel",
      borderRadius: "l3",
      boxShadow: "lg",
      width: "64",
      p: "4",
      gap: "3",
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
      borderWidth: "2px",
      borderColor: "white",
      shadow: "sm",
      focusVisibleRing: "mixed",
      focusRingColor: "white",
    },
    areaBackground: {
      height: "full",
    },
    channelSlider: {
      borderRadius: "l2",
      flex: "1",
    },
    channelSliderTrack: {
      height: "var(--slider-height)",
      borderRadius: "inherit",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
    },
    swatchGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "2",
    },
    swatch: {
      ...colorSwatchRecipe.base,
      borderRadius: "l1",
    },
    swatchIndicator: {
      color: "white",
      rounded: "full",
    },
    channelSliderThumb: {
      borderRadius: "full",
      height: "var(--thumb-size)",
      width: "var(--thumb-size)",
      borderWidth: "2px",
      borderColor: "white",
      shadow: "sm",
      transform: "translate(-50%, -50%)",
      focusVisibleRing: "outside",
      focusRingOffset: "1px",
    },
    channelInput: {
      ...inputRecipe.base,
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
    formatSelect: {
      textStyle: "xs",
      textTransform: "uppercase",
      borderWidth: "1px",
      minH: "6",
      focusRing: "inside",
      rounded: "l2",
    },
    transparencyGrid: {
      borderRadius: "l2",
    },
    view: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
  },

  variants: {
    size: {
      "2xs": {
        channelInput: inputRecipe.variants?.size?.["2xs"],
        swatch: { "--swatch-size": "sizes.4.5" },
        trigger: { "--input-height": "sizes.7" },
        area: { "--thumb-size": "sizes.3" },
        channelSlider: {
          "--slider-height": "sizes.3",
          "--thumb-size": "sizes.3",
        },
      },
      xs: {
        channelInput: inputRecipe.variants?.size?.xs,
        swatch: { "--swatch-size": "sizes.5" },
        trigger: { "--input-height": "sizes.8" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
      sm: {
        channelInput: inputRecipe.variants?.size?.sm,
        swatch: { "--swatch-size": "sizes.6" },
        trigger: { "--input-height": "sizes.9" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
      md: {
        channelInput: inputRecipe.variants?.size?.md,
        swatch: { "--swatch-size": "sizes.7" },
        trigger: { "--input-height": "sizes.10" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
      lg: {
        channelInput: inputRecipe.variants?.size?.lg,
        swatch: { "--swatch-size": "sizes.7" },
        trigger: { "--input-height": "sizes.11" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
      xl: {
        channelInput: inputRecipe.variants?.size?.xl,
        swatch: { "--swatch-size": "sizes.8" },
        trigger: { "--input-height": "sizes.12" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
      "2xl": {
        channelInput: inputRecipe.variants?.size?.["2xl"],
        swatch: { "--swatch-size": "sizes.10" },
        trigger: { "--input-height": "sizes.16" },
        area: { "--thumb-size": "sizes.3.5" },
        channelSlider: {
          "--slider-height": "sizes.3.5",
          "--thumb-size": "sizes.3.5",
        },
      },
    },

    variant: {
      outline: {
        channelInput: inputRecipe.variants?.variant?.outline,
        trigger: {
          borderWidth: "1px",
        },
      },
      subtle: {
        channelInput: inputRecipe.variants?.variant?.subtle,
        trigger: {
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "bg.muted",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
