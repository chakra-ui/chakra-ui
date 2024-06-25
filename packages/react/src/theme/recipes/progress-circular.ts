import { progressAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const circularProgressSlotRecipe = defineSlotRecipe({
  slots: progressAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      colorPalette: "gray",
      fontSize: "sm",
      position: "relative",
    },
    circle: {
      _indeterminate: {
        animation: "spin",
        animationDuration: "normal",
      },
    },
    circleTrack: {
      stroke: "bg.muted",
    },
    circleRange: {
      stroke: "colorPalette.600",
      transitionProperty: "stroke-dasharray, stroke",
      transitionDuration: "0.6s",
      _indeterminate: {
        animation: "circular-progress 1.5s infinite",
      },
    },
    label: {
      display: "inline-flex",
    },
    valueText: {
      fontSize: "xs",
      lineHeight: "1",
      fontWeight: "medium",
      letterSpacing: "tight",
      fontVariantNumeric: "tabular-nums",
    },
  },
  variants: {
    indeterminate: {
      true: {
        range: {
          "--animate-from-x": "-40%",
          "--animate-to-x": "100%",
          position: "absolute",
          willChange: "left",
          minWidth: "50%",
          animation: "position 1s ease infinite normal none running",
          backgroundImage: `linear-gradient(to right, transparent 0%, var(--track-color) 50%, transparent 100%)`,
        },
      },
      false: {
        range: {
          bgColor: "var(--track-color)",
        },
      },
    },
    valuePlacement: {
      center: {
        valueText: {
          top: "50%",
          left: "50%",
          textAlign: "center",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        },
      },
    },
    size: {
      xs: {
        circle: {
          "--size": "24px",
          "--thickness": "2px",
        },
      },
      sm: {
        circle: {
          "--size": "36px",
          "--thickness": "4px",
        },
      },
      md: {
        circle: {
          "--size": "40px",
          "--thickness": "4px",
        },
      },
      lg: {
        circle: {
          "--size": "48px",
          "--thickness": "4px",
        },
      },
    },
  },
  defaultVariants: {
    size: "lg",
    colorPalette: "gray",
  },
})
