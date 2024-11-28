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
      textStyle: "sm",
      position: "relative",
      isolation: "isolate",
      touchAction: "none",
    },
    label: {
      fontWeight: "medium",
      textStyle: "sm",
    },
    control: {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
    },
    track: {
      overflow: "hidden",
      borderRadius: "full",
      flex: "1",
    },
    range: {
      width: "inherit",
      height: "inherit",
      _disabled: { bg: "border.emphasized!" },
    },
    markerGroup: {
      position: "absolute!",
      zIndex: "1",
    },
    marker: {
      "--marker-bg": { base: "white", _underValue: "colors.bg" },
      display: "flex",
      alignItems: "center",
      gap: "calc(var(--slider-thumb-size) / 2)",
      color: "fg.muted",
      textStyle: "xs",
    },
    markerIndicator: {
      width: "var(--slider-marker-size)",
      height: "var(--slider-marker-size)",
      borderRadius: "full",
      bg: "var(--marker-bg)",
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
        ringColor: "colorPalette.focusRing",
        ringOffset: "2px",
        ringOffsetColor: "bg",
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--slider-thumb-size": "sizes.4",
          "--slider-track-size": "sizes.1.5",
          "--slider-marker-center": "6px",
          "--slider-marker-size": "sizes.1",
          "--slider-marker-inset": "3px",
        },
      },
      md: {
        root: {
          "--slider-thumb-size": "sizes.5",
          "--slider-track-size": "sizes.2",
          "--slider-marker-center": "8px",
          "--slider-marker-size": "sizes.1",
          "--slider-marker-inset": "4px",
        },
      },
      lg: {
        root: {
          "--slider-thumb-size": "sizes.6",
          "--slider-track-size": "sizes.2.5",
          "--slider-marker-center": "9px",
          "--slider-marker-size": "sizes.1.5",
          "--slider-marker-inset": "5px",
        },
      },
    },
    variant: {
      outline: {
        track: {
          shadow: "inset",
          bg: "bg.emphasized/72",
        },
        range: {
          bg: "colorPalette.solid",
        },
        thumb: {
          borderWidth: "2px",
          borderColor: "colorPalette.solid",
          bg: "bg",
          _disabled: {
            bg: "border.emphasized",
            borderColor: "border.emphasized",
          },
        },
      },
      solid: {
        track: {
          bg: "colorPalette.subtle",
          _disabled: {
            bg: "bg.muted",
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
          "&[data-has-mark-label]": {
            marginEnd: "4",
          },
        },
        track: {
          width: "var(--slider-track-size)",
        },
        thumb: {
          left: "50%",
          translate: "-50% 0",
        },
        markerGroup: {
          insetStart: "var(--slider-marker-center)",
          insetBlock: "var(--slider-marker-inset)",
        },
        marker: {
          flexDirection: "row",
        },
      },
      horizontal: {
        control: {
          flexDirection: "row",
          width: "100%",
          minHeight: "var(--slider-thumb-size)",
          "&[data-has-mark-label]": {
            marginBottom: "4",
          },
        },
        track: {
          height: "var(--slider-track-size)",
        },
        thumb: {
          top: "50%",
          translate: "0 -50%",
        },
        markerGroup: {
          top: "var(--slider-marker-center)",
          insetInline: "var(--slider-marker-inset)",
        },
        marker: {
          flexDirection: "column",
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
