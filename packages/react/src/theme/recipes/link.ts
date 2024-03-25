import { defineRecipe } from "../../styled-system"

export const linkRecipe = defineRecipe({
  base: {
    outline: "none",
    cursor: "pointer",
    borderRadius: "sm",
  },
  variants: {
    variant: {
      underline: {
        color: { base: "colorPalette.700", _dark: "colorPalette.400" },
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: "currentColor/20",
      },
      plain: {
        color: { base: "colorPalette.600", _dark: "colorPalette.500" },
        _hover: {
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "currentColor/20",
        },
      },
    },
  },
  compoundVariants: [
    {
      colorPalette: "gray",
      css: { color: "fg" },
    },
  ],
  defaultVariants: {
    variant: "plain",
  },
})
