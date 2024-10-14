import { defineRecipe } from "../../styled-system"

export const iconRecipe = defineRecipe({
  className: "chakra-icon",
  base: {
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: "0",
    color: "currentcolor",
    verticalAlign: "middle",
  },

  variants: {
    size: {
      inherit: {
        width: "1em",
        height: "1em",
      },
      xs: {
        width: "3",
        height: "3",
      },
      sm: {
        width: "4",
        height: "4",
      },
      md: {
        width: "5",
        height: "5",
      },
      lg: {
        width: "6",
        height: "6",
      },
      xl: {
        width: "7",
        height: "7",
      },
      "2xl": {
        width: "8",
        height: "8",
      },
    },
  },

  defaultVariants: {
    size: "inherit",
  },
})
