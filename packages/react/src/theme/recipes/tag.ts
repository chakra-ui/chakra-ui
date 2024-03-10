import { tagAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const badgeVariant = badgeRecipe.variants?.variant

export const tagSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      colorPalette: "gray",
      display: "inline-flex",
      verticalAlign: "top",
      alignItems: "center",
      maxWidth: "100%",
      userSelect: "none",
      borderRadius: "md",
      "& svg": {
        fontSize: "md",
      },
      "& > svg:first-of-type": {
        marginStart: "0.2em",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
        outlineOffset: "2px",
      },
    },
    label: {
      display: "inline-flex",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      borderRadius: "xs",
      color: "currentColor/60",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.500",
        outlineOffset: "2px",
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          minH: "5",
          minW: "5",
          fontSize: "xs",
          px: "0.5",
        },
        label: {
          px: "1",
        },
        closeTrigger: {
          marginEnd: "0.5",
        },
      },
      md: {
        root: {
          minH: "6",
          minW: "6",
          fontSize: "sm",
          px: "0.5",
        },
        label: {
          px: "1.5",
        },
        closeTrigger: {
          marginEnd: "0.5",
        },
      },
      lg: {
        root: {
          minH: "8",
          minW: "8",
          fontSize: "md",
          px: "0.5",
        },
        label: {
          px: "1.5",
        },
        closeTrigger: {
          marginEnd: "1",
        },
      },
    },
    variant: {
      subtle: {
        root: badgeVariant?.subtle,
      },
      solid: {
        root: badgeVariant?.solid,
      },
      outline: {
        root: badgeVariant?.outline,
      },
      surface: {
        root: badgeVariant?.surface,
      },
      raised: {
        root: {
          bg: "bg.panel",
          color: { base: "colorPalette.800", _dark: "colorPalette.300" },
          boxShadow: "sm",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "subtle",
    colorPalette: "gray",
  },
})
