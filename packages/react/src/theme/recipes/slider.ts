import { sliderAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const sliderSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      fontSize: "sm",
      position: "relative",
      colorPalette: "gray",
    },
    control: {
      display: "inline-block",
      position: "relative",
      minHeight: "var(--slider-thumb-size)",
    },
    track: {
      overflow: "hidden",
      borderRadius: "sm",
    },
    filledTrack: {
      width: "inherit",
      height: "inherit",
      _disabled: {
        bg: { base: "gray.300!", _dark: "gray.500!" },
      },
    },
    thumb: {
      width: "var(--slider-thumb-size)",
      height: "var(--slider-thumb-size)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: 0,
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      borderWidth: "1px",
      borderColor: "gray.400/40",
      _disabled: {
        bg: { base: "gray.300", _dark: "gray.400" },
      },
      _focusVisible: {
        ring: "2px",
        ringColor: "colorPalette.500",
        ringOffset: "2px",
        ringOffsetColor: "bg",
      },
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          "--slider-thumb-size": "sizes.2.5",
          "--slider-track-size": "sizes.0.5",
        },
      },
      sm: {
        root: {
          "--slider-thumb-size": "sizes.3",
          "--slider-track-size": "sizes.1",
        },
      },
      md: {
        root: {
          "--slider-thumb-size": "sizes.4",
          "--slider-track-size": "sizes.1.5",
        },
      },
      lg: {
        root: {
          "--slider-thumb-size": "sizes.5",
          "--slider-track-size": "sizes.2",
        },
      },
    },
    variant: {
      outline: {
        track: {
          shadow: "inset",
          bg: "bg.muted",
        },
        filledTrack: {
          bg: "colorPalette.600",
        },
      },
      subtle: {
        track: {
          bg: "bg.muted",
        },
        filledTrack: {
          bg: { base: "colorPalette.600", _dark: "colorPalette.600/40" },
        },
      },
    },
    orientation: {
      vertical: {
        control: {
          height: "100%",
        },
        track: {
          width: "var(--slider-track-size)",
        },
        thumb: {
          left: "50%",
          translate: "-50% 0",
        },
      },
      horizontal: {
        control: {
          width: "100%",
        },
        track: {
          height: "var(--slider-track-size)",
        },
        thumb: {
          top: "50%",
          translate: "0 -50%",
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      colorPalette: "gray",
      css: {
        filledTrack: {
          bg: { base: "gray.800", _dark: "gray.200" },
        },
      },
    },
    {
      variant: "subtle",
      colorPalette: "gray",
      css: {
        filledTrack: {
          bg: { base: "gray.600", _dark: "gray.200/64" },
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "outline",
    orientation: "horizontal",
    colorPalette: "gray",
  },
})
