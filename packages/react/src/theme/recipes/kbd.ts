import { defineRecipe } from "../../styled-system"

export const kbdRecipe = defineRecipe({
  base: {
    bg: { base: "gray.100", _dark: "whiteAlpha.100" },
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap",
  },
})
