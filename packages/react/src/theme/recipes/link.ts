import { defineRecipe } from "../../styled-system"

export const linkRecipe = defineRecipe({
  className: "chakra-link",
  base: {
    colorPalette: "gray",
    display: "inline-flex",
    alignItems: "center",
    outline: "none",
    gap: "1.5",
    cursor: "pointer",
    borderRadius: "xs",
    focusRing: "outside",
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
