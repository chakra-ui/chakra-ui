import { segmentGroupAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const segmentGroupSlotRecipe = defineSlotRecipe({
  className: "chakra-segment-group",
  slots: segmentGroupAnatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      boxShadow: "inset",
      minW: "max-content",
      textAlign: "center",
      position: "relative",
      isolation: "isolate",
      bg: "bg.subtle",
    },

    item: {
      display: "flex",
      alignItems: "center",
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
        insetInlineStart: 0,
        insetBlock: "1.5",
        bg: "border",
        width: "1px",
        transition: "opacity 0.2s",
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
      shadow: "sm",
      pos: "absolute",
      bg: { _light: "bg", _dark: "border.emphasized" },
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
      sm: {
        root: {
          rounded: "sm",
          height: "6",
          "--segment-radius": "radii.sm",
        },
        item: {
          fontSize: "xs",
          px: "3",
          gap: "1",
        },
      },
      md: {
        root: {
          rounded: "md",
          height: "8",
          "--segment-radius": "radii.sm",
        },
        item: {
          fontSize: "sm",
          px: "4",
          gap: "2",
        },
      },
      lg: {
        root: {
          rounded: "lg",
          height: "10",
          "--segment-radius": "radii.md",
        },
        item: {
          fontSize: "md",
          px: "5",
          gap: "3",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
