import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  className: "chakra-badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    fontWeight: "medium",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  variants: {
    variant: {
      solid: {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
      },
      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
      },
      outline: {
        color: "colorPalette.fg",
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.emphasized",
      },
      surface: {
        bg: "colorPalette.muted",
        color: "colorPalette.fg",
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.subtle",
      },
      plain: {
        color: "colorPalette.fg",
      },
    },
    size: {
      xs: {
        textStyle: "2xs",
        borderRadius: "xs",
        px: "1",
        py: "1px",
      },
      sm: {
        textStyle: "xs",
        borderRadius: "sm",
        px: "1.5",
        py: "1px",
      },
      md: {
        textStyle: "sm",
        borderRadius: "sm",
        px: "2",
        py: "1px",
      },
      lg: {
        textStyle: "sm",
        borderRadius: "sm",
        px: "2.5",
        py: "1",
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "sm",
  },
})
