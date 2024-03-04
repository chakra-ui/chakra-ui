import { progressAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const progressSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      colorPalette: "blue",
    },
    track: {
      overflow: "hidden",
      position: "relative",
      bg: { base: "gray.100", _dark: "whiteAlpha.300" },
    },
    filledTrack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transitionProperty: "common",
      transitionDuration: "slow",
      height: "100%",
      "--track-color": {
        base: "color.colorPalette.500",
        _dark: "color.colorPalette.200",
      },
    },
    valueText: {
      lineHeight: "1",
      fontSize: "0.25em",
      fontWeight: "bold",
      color: "white",
    },
  },
  variants: {
    isIndeterminate: {
      true: {
        filledTrack: {
          position: "absolute",
          willChange: "left",
          minWidth: "50%",
          animation:
            "var(--progress-animation) 1s ease infinite normal none running",
          backgroundImage: `linear-gradient(to right, transparent 0%, var(--track-color) 50%, transparent 100%)`,
        },
      },
      false: {
        filledTrack: {
          bgColor: "var(--track-color)",
        },
      },
    },
    hasStripe: {
      true: {},
    },
    isAnimated: {
      true: {
        filledTrack: {
          animation: "var(--stripe-animation) 1s linear infinite",
        },
      },
    },
    size: {
      xs: {
        track: { h: "1" },
      },
      sm: {
        track: { h: "2" },
      },
      md: {
        track: { h: "3" },
      },
      lg: {
        track: { h: "4" },
      },
    },
  },
  compoundVariants: [
    {
      isIndeterminate: false,
      hasStripe: true,
      css: {
        filledTrack: {
          backgroundImage: `linear-gradient(45deg, var(--stripe-color) 25%, transparent 25%, transparent 50%, var(--stripe-color) 50%, var(--stripe-color) 75%, transparent 75%, transparent)`,
          backgroundSize: `var(--stripe-size) var(--stripe-size)`,
          "--stripe-size": "1rem",
          "--stripe-color": {
            base: "rgba(255, 255, 255, 0.15)",
            _dark: "rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
  },
})
