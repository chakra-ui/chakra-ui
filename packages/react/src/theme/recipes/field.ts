import { defineRecipe } from "../../styled-system"

export const fieldRecipe = defineRecipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    position: "relative",
    gap: "2",
  },
})
