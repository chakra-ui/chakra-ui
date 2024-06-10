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
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          rounded: "sm",
          height: "6",
        },
        item: {
          fontSize: "xs",
          px: "3",
          gap: "1",
        },
        indicator: {
          rounded: "xs",
        },
      },
      md: {
        root: {
          rounded: "md",
          height: "8",
        },
        item: {
          fontSize: "sm",
          px: "4",
          gap: "2",
        },
        indicator: {
          rounded: "sm",
        },
      },
      lg: {
        root: {
          rounded: "lg",
          height: "10",
        },
        item: {
          fontSize: "md",
          px: "5",
          gap: "3",
        },
        indicator: {
          rounded: "md",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
})
