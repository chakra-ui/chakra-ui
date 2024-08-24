import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  className: "chakra-badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
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
        bg: { base: "colorPalette.200", _dark: "colorPalette.400/20" },
        color: { base: "colorPalette.800", _dark: "colorPalette.300" },
      },
      outline: {
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
      },
      surface: {
        bg: { base: "colorPalette.50", _dark: "colorPalette.300/20" },
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
      },
      plain: {
        color: { base: "colorPalette.800", _dark: "colorPalette.200" },
      },
    },
    size: {
      xs: {
        textStyle: "2xs",
        borderRadius: "xs",
        px: "1",
        _empty: {
          height: "1",
        },
      },
      sm: {
        textStyle: "xs",
        borderRadius: "sm",
        px: "1.5",
        _empty: {
          height: "2",
        },
      },
      md: {
        textStyle: "sm",
        borderRadius: "sm",
        px: "2",
        _empty: {
          height: "4",
        },
      },
      lg: {
        textStyle: "sm",
        borderRadius: "sm",
        px: "2",
        py: "0.5",
        _empty: {
          height: "4",
        },
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "sm",
    colorPalette: "gray",
  },
})
