import { defineRecipe } from "../def"

export const separatorRecipe = defineRecipe({
  className: "separator",
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
        height: "100%",
        borderInlineStartWidth: "var(--separator-thickness)",
      },
      horizontal: {
        width: "100%",
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
