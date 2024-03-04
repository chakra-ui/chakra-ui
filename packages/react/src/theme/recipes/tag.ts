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
      gap: "0.5rem",
      alignItems: "center",
      maxWidth: "100%",
      color: "tag-color",
      bg: "tag-bg",
      boxShadow: "tag-shadow",
      borderRadius: "md",
      minH: "tag-min-height",
      minW: "tag-min-width",
      fontSize: "tag-font-size",
      px: "tag-padding-inline",
      _focusVisible: {
        boxShadow: "shadows.outline",
      },
    },
    label: {
      lineHeight: 1.2,
      overflow: "visible",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      fontSize: "lg",
      w: "5",
      h: "5",
      transitionProperty: "common",
      transitionDuration: "normal",
      borderRadius: "full",
      marginStart: "1.5",
      marginEnd: "-1",
      opacity: { base: 0.5, _hover: 0.8, _active: 1, _disabled: 0.4 },
      _focusVisible: {
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          minH: "sizes.5",
          minW: "sizes.5",
          fontSize: "fontSizes.xs",
          px: "space.2",
        },
        closeTrigger: {
          marginEnd: "-2px",
          marginStart: "0.35rem",
        },
      },
      md: {
        root: {
          minH: "sizes.6",
          minW: "sizes.6",
          fontSize: "fontSizes.sm",
          px: "space.2",
        },
      },
      lg: {
        root: {
          minH: "sizes.8",
          minW: "sizes.8",
          fontSize: "fontSizes.md",
          px: "space.3",
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
    },
  },
  defaultVariants: {
    size: "md",
    variant: "subtle",
  },
})
