import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5",
    fontWeight: "medium",
    fontVariantNumeric: "tabular-nums",
    borderRadius: "sm",
    colorPalette: "gray",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  variants: {
    variant: {
      solid: {
        bg: "colorPalette.600",
        color: "white",
      },
      subtle: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        color: { base: "colorPalette.800", _dark: "colorPalette.400" },
      },
      outline: {
        shadowColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
        color: { base: "colorPalette.800", _dark: "colorPalette.400/80" },
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
      },
    },
    size: {
      sm: {
        fontSize: "xs",
        px: "1",
      },
      md: {
        fontSize: "sm",
        px: "2",
      },
      lg: {
        fontSize: "sm",
        px: "2",
        py: "1",
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "sm",
  },
})
