import { progressAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const progressCircleSlotRecipe = defineSlotRecipe({
  className: "chakra-progress-circle",
  slots: progressAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      colorPalette: "gray",
      textStyle: "sm",
      position: "relative",
    },
    circle: {
      _indeterminate: {
        animation: "spin 2s linear infinite",
      },
    },
    circleTrack: {
      "--track-color": "colors.bg.emphasized",
      stroke: "var(--track-color)",
    },
    circleRange: {
      stroke: "colorPalette.600",
      transitionProperty: "stroke-dasharray, stroke",
      transitionDuration: "0.6s",
      _indeterminate: {
        animation: "circular-progress 1.5s linear infinite",
      },
    },
    label: {
      display: "inline-flex",
    },
    valueText: {
      lineHeight: "1",
      fontWeight: "medium",
      letterSpacing: "tight",
      fontVariantNumeric: "tabular-nums",
    },
  },
  variants: {
    size: {
      xs: {
        circle: {
          "--size": "24px",
          "--thickness": "4px",
        },
        valueText: {
          textStyle: "2xs",
        },
      },
      sm: {
        circle: {
          "--size": "32px",
          "--thickness": "5px",
        },
        valueText: {
          textStyle: "2xs",
        },
      },
      md: {
        circle: {
          "--size": "48px",
          "--thickness": "6px",
        },
        valueText: {
          textStyle: "xs",
        },
      },
      lg: {
        circle: {
          "--size": "64px",
          "--thickness": "8px",
        },
        valueText: {
          textStyle: "sm",
        },
      },
    },
  },

  compoundVariants: [
    {
      colorPalette: "gray",
      css: {
        circleRange: {
          stroke: { base: "gray.800", _dark: "gray.200" },
        },
      },
    },
  ],

  defaultVariants: {
    size: "md",
    colorPalette: "gray",
  },
})
