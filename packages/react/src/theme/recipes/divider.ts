import { defineRecipe } from "../../styled-system"

export const separatorRecipe = defineRecipe({
  base: {
    borderColor: "border",
    "--divider-border-width": "1px",
  },
  variants: {
    variant: {
      solid: {
        borderStyle: "solid",
      },
      dashed: {
        borderStyle: "dashed",
      },
      dotted: {
        borderStyle: "dotted",
      },
    },
    orientation: {
      vertical: {
        height: "100%",
        borderInlineStartWidth: "var(--divider-border-width)",
      },
      horizontal: {
        width: "100%",
        borderTopWidth: "var(--divider-border-width)",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
  },
})
