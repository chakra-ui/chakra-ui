import { defineRecipe } from "../../styled-system"

export const skeletonRecipe = defineRecipe({
  base: {
    "--start-color": { base: "colors.gray.100", _dark: "colors.gray.800" },
    "--end-color": { base: "colors.gray.400", _dark: "colors.gray.600" },
    background: "var(--start-color)",
    borderColor: "var(--end-color)",
    opacity: 0.7,
    borderRadius: "sm",
  },
})
