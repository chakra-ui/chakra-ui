import { defineRecipe } from "../def"

export const linkRecipe = defineRecipe({
  className: "link",
  base: {
    display: "inline-flex",
    alignItems: "center",
    outline: "none",
    gap: "1.5",
    cursor: "pointer",
    borderRadius: "l1",
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
