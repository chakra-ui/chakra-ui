import { breadcrumbAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const breadcrumbSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    link: {
      transitionProperty: "common",
      transitionDuration: "fast",
      transitionTimingFunction: "ease-out",
      outline: "none",
      color: "inherit",
      textDecoration: "none",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
    },
  },
  variants: {
    current: {
      false: {
        link: {
          cursor: "pointer",
          _hover: { textDecoration: "underline" },
          _focusVisible: { boxShadow: "outline" },
        },
      },
    },
  },
})
