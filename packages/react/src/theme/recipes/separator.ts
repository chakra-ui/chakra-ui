import { defineRecipe } from "../../styled-system"

export const separatorRecipe = defineRecipe({
  className: "chakra-separator",
  base: {
    display: "block",
    borderColor: "border",
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
        borderInlineStartWidth: "var(--separator-thickness)",
      },
      horizontal: {
        borderTopWidth: "var(--separator-thickness)",
      },
    },
    size: {
      xs: {
        "--separator-thickness": "0.5px",
      },
      sm: {
        "--separator-thickness": "1px",
      },
      md: {
        "--separator-thickness": "2px",
      },
      lg: {
        "--separator-thickness": "3px",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "solid",
    orientation: "horizontal",
  },
})
