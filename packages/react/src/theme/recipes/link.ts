import { defineRecipe } from "../../styled-system"

export const linkRecipe = defineRecipe({
  className: "chakra-link",
  base: {
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
        color: "colorPalette.fg",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: "currentColor/20",
      },
      plain: {
        color: "colorPalette.fg",
        _hover: {
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "currentColor/20",
        },
      },
    },
  },

  defaultVariants: {
    variant: "plain",
  },
})
