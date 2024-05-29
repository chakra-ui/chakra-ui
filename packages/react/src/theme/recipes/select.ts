import { selectAnatomy } from "@ark-ui/anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {
    root: {
      colorPalette: "accent",
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      width: "full",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bg: "bg",
      width: "full",
      _placeholderShown: {
        color: "fg.subtle",
      },
      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
        outlineOffset: "2px",
      },
    },
    content: {
      background: "bg",
      borderRadius: "l2",
      boxShadow: "sm",
      display: "flex",
      flexDirection: "column",
      zIndex: "dropdown",
      minW: "12rem",
      _open: {
        animation: "fade-in 0.25s",
      },
      _focusVisible: {
        outline: "0",
      },
    },
    item: {
      position: "relative",
      display: "flex",
      width: "full",
      alignItems: "center",
      borderRadius: "l1",
      userSelect: "none",
      _highlighted: {
        bg: "bg.muted",
      },
      _disabled: {
        pointerEvents: "none",
        opacity: "0.5",
      },
    },
    itemGroupLabel: {
      fontWeight: "semibold",
      textStyle: "sm",
    },
    label: {
      color: "fg",
      fontWeight: "medium",
    },
    valueText: {
      lineClamp: "1",
    },
  },
  variants: {
    variant: {
      outline: {
        trigger: {
          borderWidth: "1px",
        },
      },
    },
    size: {
      sm: {},
      md: {
        content: {
          p: "1",
          gap: "1",
          rounded: "md",
        },
        item: {
          textStyle: "sm",
          py: "1.5",
          px: "2",
          rounded: "sm",
        },
        itemIndicator: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& :where(svg)": {
            width: "4",
            height: "4",
          },
        },
        itemGroupLabel: {
          px: "2",
          py: "1.5",
        },
        label: {
          textStyle: "sm",
        },
        trigger: {
          px: "3",
          h: "10",
          minW: "10",
          fontSize: "sm",
          rounded: "md",
          gap: "2",
          "& :where(svg)": {
            width: "4",
            height: "4",
          },
        },
      },
      lg: {},
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
