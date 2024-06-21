import { anatomy } from "@ark-ui/anatomy/segment-group"
import { defineSlotRecipe } from "../../styled-system"

export const segmentGroupSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    root: {
      display: "inline-flex",
      boxShadow: "inset",
      minW: "max-content",
      textAlign: "center",
      position: "relative",
      isolation: "isolate",
      bg: "bg.muted",
    },

    item: {
      display: "flex",
      alignItems: "center",
      userSelect: "none",
      fontSize: "sm",
      position: "relative",
      color: "fg",
      _disabled: {
        color: "fg.subtle/60!",
      },
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        insetInlineStart: 0,
        bg: "border.subtle",
        width: "1px",
        marginBlock: "3px",
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
        borderRadius: "var(--segment-indicator-radius)",
      },
    },

    indicator: {
      shadow: "sm",
      pos: "absolute",
      bg: "bg",
      width: "var(--width)",
      height: "var(--height)",
      top: "var(--top)",
      left: "var(--left)",
      zIndex: -1,
      borderRadius: "var(--segment-indicator-radius)",
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          rounded: "sm",
          height: "6",
          "--segment-indicator-radius": "radii.sm",
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
          "--segment-indicator-radius": "radii.sm",
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
          "--segment-indicator-radius": "radii.md",
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
