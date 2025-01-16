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
      none: {},
      inherit: { boxSize: "1em" },
      xs: { boxSize: "sizes.3" },
      sm: { boxSize: "sizes.4" },
      md: { boxSize: "sizes.5" },
      lg: { boxSize: "sizes.6" },
      xl: { boxSize: "sizes.7" },
      "2xl": { boxSize: "sizes.8" },
    },
  },

  defaultVariants: {
    size: "inherit",
  },
})
