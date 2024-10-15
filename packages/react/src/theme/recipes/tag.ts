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
      gap: "1",
      alignItems: "center",
      verticalAlign: "top",
      maxWidth: "100%",
      userSelect: "none",
      borderRadius: "sm",
      _icon: {
        boxSize: "1em",
      },
      focusVisibleRing: "outside",
    },
    label: {
      lineClamp: "1",
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
          padding: "0.5",
          minH: "5",
        },
        label: {
          textStyle: "xs",
        },
      },
      md: {
        root: {
          padding: "0.5",
          minH: "6",
        },
        label: {
          textStyle: "sm",
        },
      },
      lg: {
        root: {
          padding: "1.5",
          minH: "7",
        },
        label: {
          textStyle: "sm",
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
