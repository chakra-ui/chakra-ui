import { defineRecipe } from "@chakra-ui/react"

export const formLabelRecipe = defineRecipe({
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
