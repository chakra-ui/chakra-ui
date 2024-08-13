import { defineRecipe } from "../../styled-system"

export const iconRecipe = defineRecipe({
  className: "icon",
  base: {
    width: "1em",
    height: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: "currentcolor",
  },
})
