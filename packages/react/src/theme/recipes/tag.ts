import { tagAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { badgeRecipe } from "./badge"

const badgeVariant = badgeRecipe.variants?.variant

export const tagSlotRecipe = defineSlotRecipe({
  slots: tagAnatomy.keys(),
  className: "chakra-tag",
  base: {
    root: {
      display: "inline-flex",
      verticalAlign: "top",
      alignItems: "center",
      maxWidth: "100%",
      userSelect: "none",
      _icon: {
        fontSize: "md",
      },
      focusVisibleRing: "outside",
    },
    label: {
      lineClamp: "1",
      lineHeight: "1.2",
      px: "0.2em",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      borderRadius: "xs",
      color: "currentColor/60",
      focusVisibleRing: "outside",
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          fontSize: "xs",
          padding: "0.5",
          gap: "1",
          borderRadius: "sm",
        },
      },
      md: {
        root: {
          fontSize: "sm",
          padding: "1",
          gap: "1",
          borderRadius: "md",
        },
      },
      lg: {
        root: {
          fontSize: "sm",
          padding: "1.5",
          gap: "1",
          borderRadius: "md",
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
    },
  },

  defaultVariants: {
    size: "md",
    variant: "surface",
  },
})
