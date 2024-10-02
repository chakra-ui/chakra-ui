import { sliderAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const sliderSlotRecipe = defineSlotRecipe({
  className: "chakra-slider",
  slots: sliderAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1",
      fontSize: "sm",
      position: "relative",
      isolation: "isolate",
      touchAction: "none",
    },
    control: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
    },
    track: {
      overflow: "hidden",
      borderRadius: "sm",
      flex: "1",
    },
    range: {
      width: "inherit",
      height: "inherit",
      _disabled: { bg: "border.emphasized!" },
    },
    markerGroup: {
      position: "absolute!",
      top: "var(--slider-marker-top)",
      insetInline: "var(--slider-marker-inset)",
      zIndex: "1",
    },
    marker: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5",
      color: "fg.subtle",
      fontSize: "xs",
    },
    markerIndicator: {
      width: "var(--slider-marker-size)",
      height: "var(--slider-marker-size)",
      borderRadius: "full",
      bg: "var(--slider-marker-bg, white)",
    },
    thumb: {
      width: "var(--slider-thumb-size)",
      height: "var(--slider-thumb-size)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: 0,
      zIndex: "2",
      borderRadius: "full",

      _focusVisible: {
        ring: "2px",
        ringColor: "focusRing",
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
          "--slider-marker-top": "2px",
          "--slider-marker-size": "2px",
          "--slider-marker-inset": "1px",
        },
      },
      sm: {
        root: {
          "--slider-thumb-size": "sizes.3",
          "--slider-track-size": "sizes.1",
          "--slider-marker-top": "5px",
          "--slider-marker-size": "2px",
          "--slider-marker-inset": "2px",
        },
      },
      md: {
        root: {
          "--slider-thumb-size": "sizes.4",
          "--slider-track-size": "sizes.1.5",
          "--slider-marker-top": "6px",
          "--slider-marker-size": "4px",
          "--slider-marker-inset": "3px",
        },
      },
      lg: {
        root: {
          "--slider-thumb-size": "sizes.5",
          "--slider-track-size": "sizes.2",
          "--slider-marker-top": "8px",
          "--slider-marker-size": "4px",
          "--slider-marker-inset": "4px",
        },
      },
    },
    variant: {
      outline: {
        track: {
          shadow: "inset",
          bg: "bg.subtle",
        },
        range: {
          bg: "colorPalette.solid",
        },
        thumb: {
          borderWidth: "1px",
          borderColor: "border.emphasized",
          bg: "white",
          _disabled: {
            bg: "border.emphasized",
          },
        },
      },
      subtle: {
        track: {
          bg: "colorPalette.subtle",
          _disabled: {
            bg: "bg.subtle",
          },
        },
        range: {
          bg: "colorPalette.solid",
        },
        thumb: {
          bg: "colorPalette.solid",
          _disabled: {
            bg: "border.emphasized",
          },
        },
      },
    },
    orientation: {
      vertical: {
        root: {
          display: "inline-flex",
        },
        control: {
          flexDirection: "column",
          height: "100%",
          minWidth: "var(--slider-thumb-size)",
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
          flexDirection: "row",
          width: "100%",
          minHeight: "var(--slider-thumb-size)",
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

  defaultVariants: {
    size: "md",
    variant: "outline",
    orientation: "horizontal",
  },
})
