import { defineRecipe } from "../../styled-system"

export const tooltipRecipe = defineRecipe({
  base: {
    "--bg": { base: "colors.gray.700", _dark: "colors.gray.300" },
    "--popper-arrow-bg": "var(--bg)",
    bg: "var(--bg)",
    color: { base: "whiteAlpha.900", _dark: "gray.900" },
    px: "2",
    py: "0.5",
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "xs",
    zIndex: "tooltip",
  },
})
