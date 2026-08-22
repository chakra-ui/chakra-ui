import { segmentGroupAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const segmentGroupSlotRecipe = defineSlotRecipe({
  className: "chakra-segment-group",
  slots: segmentGroupAnatomy.keys(),
  base: {
    root: {
      "--segment-radius": "radii.l2",
      "--segment-indicator-bg": {
        _light: "colors.bg",
        _dark: "colors.bg.emphasized",
      },
      "--segment-indicator-shadow": "shadows.sm",
      borderRadius: "var(--segment-radius)",
      display: "inline-flex",
      boxShadow: "inset",
      minW: "max-content",
      textAlign: "center",
      position: "relative",
      isolation: "isolate",
      bg: "bg.muted",
      _vertical: {
        flexDirection: "column",
      },
    },

    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      fontSize: "sm",
      position: "relative",
      color: "fg",
      borderRadius: "var(--segment-radius)",
      _disabled: {
        opacity: "0.5",
      },
      "&:has(input:focus-visible)": {
        focusRing: "outside",
      },

      _before: {
        content: '""',
        position: "absolute",
        bg: "border",
        transition: "opacity 0.2s",
      },

      _horizontal: {
        _before: {
          insetInlineStart: 0,
          insetBlock: "1.5",
          width: "1px",
        },
      },

      _vertical: {
        _before: {
          insetBlockStart: 0,
          insetInline: "1.5",
          height: "1px",
        },
      },

      "& + &[data-state=checked], &[data-state=checked] + &, &:first-of-type": {
        _before: {
          opacity: "0",
        },
      },

      "&[data-state=checked][data-ssr]": {
        shadow: "sm",
        bg: "bg",
        borderRadius: "var(--segment-radius)",
      },
    },

    indicator: {
      shadow: "var(--segment-indicator-shadow)",
      pos: "absolute",
      bg: "var(--segment-indicator-bg)",
      width: "var(--width)",
      height: "var(--height)",
      top: "var(--top)",
      left: "var(--left)",
      zIndex: -1,
      borderRadius: "var(--segment-radius)",
    },
  },

  variants: {
    size: {
      xs: {
        item: {
          textStyle: "xs",
          px: "3",
          gap: "1",
          height: "6",
        },
      },
      sm: {
        item: {
          textStyle: "sm",
          px: "4",
          gap: "2",
          height: "8",
        },
      },
      md: {
        item: {
          textStyle: "sm",
          px: "4",
          gap: "2",
          height: "10",
        },
      },
      lg: {
        item: {
          textStyle: "md",
          px: "4.5",
          gap: "3",
          height: "11",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
