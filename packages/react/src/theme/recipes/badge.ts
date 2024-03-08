import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5",
    fontWeight: "medium",
    fontVariantNumeric: "tabular-nums",
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
        color: { base: "colorPalette.800", _dark: "colorPalette.300" },
      },
      outline: {
        shadowColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
      },
      surface: {
        bg: { base: "colorPalette.50", _dark: "colorPalette.300/20" },
        shadowColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
      },
      plain: {
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      },
    },
    size: {
      xs: {
        fontSize: "2xs",
        borderRadius: "xs",
        px: "0.5",
      },
      sm: {
        fontSize: "xs",
        borderRadius: "sm",
        px: "1",
      },
      md: {
        fontSize: "sm",
        borderRadius: "sm",
        px: "2",
      },
      lg: {
        fontSize: "sm",
        borderRadius: "sm",
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
