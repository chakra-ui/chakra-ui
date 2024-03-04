import { sliderAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const sliderSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      display: "inline-block",
      position: "relative",
      colorPalette: "blue",
      cursor: { base: "pointer", _disabled: "default" },
      _disabled: {
        opacity: 0.6,
        pointerEvents: "none",
      },
    },
    track: {
      overflow: "hidden",
      borderRadius: "sm",
      bg: { base: "gray.200", _dark: "whiteAlpha.200" },
      _disabled: {
        bg: { base: "gray.300", _dark: "whiteAlpha.300" },
      },
    },
    filledTrack: {
      width: "inherit",
      height: "inherit",
      bg: { base: "colorPalette.500", _dark: "colorPalette.200" },
    },
    thumb: {
      width: "var(--thumb-size)",
      height: "var(--thumb-size)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0,
      zIndex: 1,
      borderRadius: "full",
      bg: { base: "white", _disabled: "gray.300" },
      boxShadow: "base",
      border: "1px solid",
      borderColor: "transparent",
      transitionProperty: "transform",
      transitionDuration: "normal",
      _focusVisible: {
        boxShadow: "outline",
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--thumb-size": "sizes.2.5",
          "--track-size": "sizes.0.5",
        },
      },
      md: {
        root: {
          "--thumb-size": "sizes.3.5",
          "--track-size": "sizes.1",
        },
      },
      lg: {
        root: {
          "--thumb-size": "sizes.4",
          "--track-size": "sizes.1",
        },
      },
    },
    orientation: {
      vertical: {
        root: {
          height: "100%",
        },
        track: {
          width: "var(--track-size)",
        },
        thumb: {
          left: "50%",
          translate: "-50% 0",
          scale: { base: 1, _active: 1.15 },
        },
      },
      horizontal: {
        root: {
          width: "100%",
        },
        track: {
          height: "var(--track-size)",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
