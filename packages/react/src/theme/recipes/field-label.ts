import { defineRecipe } from "../../styled-system"

export const fieldLabelRecipe = defineRecipe({
  base: {
    fontSize: "md",
    marginEnd: "3",
    mb: "2",
    fontWeight: "medium",
    transitionProperty: "common",
    transitionDuration: "normal",
    opacity: { base: 1, _disabled: 0.4 },
  },
})
