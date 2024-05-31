import { defineRecipe } from "../../styled-system"

export const labelRecipe = defineRecipe({
  base: {
    display: "block",
    textAlign: "start",
    fontSize: "sm",
    fontWeight: "medium",
    marginEnd: "3",
    userSelect: "none",
    _disabled: {
      opacity: "0.5",
    },
  },
})
