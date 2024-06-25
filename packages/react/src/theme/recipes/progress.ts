import { progressAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const progressSlotRecipe = defineSlotRecipe({
  slots: progressAnatomy.keys(),
  base: {
    root: {
      colorPalette: "gray",
      fontSize: "sm",
      position: "relative",
    },
    track: {
      overflow: "hidden",
      position: "relative",
    },
    range: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transitionProperty: "width, height",
      transitionDuration: "slow",
      height: "100%",
    },
    label: {
      display: "inline-flex",
    },
    valueText: {
      fontSize: "xs",
      lineHeight: "1",
      fontWeight: "semibold",
    },
  },

  variants: {
    variant: {
      outline: {
        track: {
          shadow: "inset",
          bgColor: { base: "gray.100", _dark: "whiteAlpha.300" },
        },
        range: {
          bgColor: "colorPalette.600",
        },
      },
      subtle: {
        track: {
          bgColor: { base: "gray.100", _dark: "whiteAlpha.300" },
        },
        range: {
          bgColor: { base: "colorPalette.400", _dark: "colorPalette.400/40" },
        },
      },
    },
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
    shape: {
      square: {},
      rounded: {
        track: {
          borderRadius: "sm",
        },
      },
      pill: {
        track: {
          borderRadius: "full",
        },
      },
    },
    striped: {
      true: {
        range: {
          backgroundImage: `linear-gradient(45deg, var(--stripe-color) 25%, transparent 25%, transparent 50%, var(--stripe-color) 50%, var(--stripe-color) 75%, transparent 75%, transparent)`,
          backgroundSize: `var(--stripe-size) var(--stripe-size)`,
          "--stripe-size": "1rem",
          "--stripe-color": {
            base: "rgba(255, 255, 255, 0.3)",
            _dark: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },

    animated: {
      true: {
        range: {
          "--animate-from": "var(--stripe-size)",
          animation: "bg-position 1s linear infinite",
        },
      },
    },

    size: {
      xs: {
        track: { h: "1" },
      },
      sm: {
        track: { h: "1.5" },
      },
      md: {
        track: { h: "2" },
      },
      lg: {
        track: { h: "2.5" },
      },
    },
  },

  compoundVariants: [
    {
      variant: "outline",
      colorPalette: "gray",
      css: {
        range: {
          bgColor: { base: "colorPalette.800", _dark: "colorPalette.200" },
        },
      },
    },
  ],

  defaultVariants: {
    variant: "outline",
    size: "md",
    shape: "rounded",
    colorPalette: "gray",
  },
})
