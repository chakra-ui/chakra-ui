import { defineRecipe } from "../../styled-system"

export const errorMessageRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2",
    color: "fg.error",
    fontSize: "xs",
  },
})
