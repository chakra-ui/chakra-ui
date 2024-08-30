import { defineRecipe } from "../../styled-system"

export const badgeRecipe = defineRecipe({
  className: "chakra-badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    fontWeight: "medium",
    fontVariantNumeric: "tabular-nums",
    colorPalette: "accent",
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
