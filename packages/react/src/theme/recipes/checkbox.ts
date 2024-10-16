import { checkboxAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { checkmarkRecipe } from "./checkmark"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  className: "chakra-checkbox",
  base: {
    root: {
      display: "inline-flex",
      gap: "2",
      alignItems: "center",
      verticalAlign: "top",
      position: "relative",
    },

    control: checkmarkRecipe.base,

    label: {
      fontWeight: "medium",
      userSelect: "none",
      _disabled: {
        opacity: "0.5",
      },
    },
  },

  variants: {
    size: {
      xs: {
        root: { gap: "1.5" },
        label: { textStyle: "xs" },
        control: checkmarkRecipe.variants?.size?.xs,
      },
      sm: {
        root: { gap: "2" },
        label: { textStyle: "sm" },
        control: checkmarkRecipe.variants?.size?.sm,
      },
      md: {
        root: { gap: "2.5" },
        label: { textStyle: "sm" },
        control: checkmarkRecipe.variants?.size?.md,
      },
      lg: {
        root: { gap: "3" },
        label: { textStyle: "md" },
        control: checkmarkRecipe.variants?.size?.lg,
      },
    },

    variant: {
      outline: {
        control: checkmarkRecipe.variants?.variant?.outline,
      },
      solid: {
        control: checkmarkRecipe.variants?.variant?.solid,
      },
      subtle: {
        control: checkmarkRecipe.variants?.variant?.subtle,
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})
