import { defineSlotRecipe } from "../def"

export const collapsibleSlotRecipe = defineSlotRecipe({
  slots: ["root", "trigger", "content", "indicator"],
  className: "collapsible",
  base: {
    content: {
      overflow: "hidden",
      _open: {
        animationName: "expand-height, fade-in",
        animationDuration: "moderate",
        "&[data-has-collapsed-size]": {
          animationName: "expand-height",
        },
      },
      _closed: {
        animationName: "collapse-height, fade-out",
        animationDuration: "moderate",
        "&[data-has-collapsed-size]": {
          animationName: "collapse-height",
        },
      },
    },
  },
})
