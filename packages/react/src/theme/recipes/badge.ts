import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  base: {
    px: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
  },
  variants: {
    colorScheme: {
      gray: { colorPalette: "gray" },
    },
    variant: {
      solid: {
        bg: { base: "colorPalette.500", _dark: "colorPalette.500/60" },
        color: { base: "white", _dark: "whiteAlpha.800" },
      },
      subtle: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.200/16" },
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      },
      outline: {
        "--shadow": "colors.colorPalette.500",
        color: { base: "colorPalette.500", _dark: "colorPalette.200/80" },
        shadow: { base: "inset 0 0 0px 1px var(--shadow)" },
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    colorScheme: "gray",
  },
})
