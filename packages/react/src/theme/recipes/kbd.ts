import { defineRecipe } from "../../styled-system"

export const kbdRecipe = defineRecipe({
  className: "kbd",
  base: {
    fontWeight: "semibold",
    lineHeight: "normal",
    fontFamily: "mono",
    flexShrink: 0,
    whiteSpace: "nowrap",
    wordSpacing: "-0.5em",
    userSelect: "none",
    colorPalette: "gray",
    py: "0.2em",
  },
  variants: {
    variant: {
      raised: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        color: "fg",
        borderWidth: "1px",
        borderBottomWidth: "var(--kbd-border)",
        borderColor: { base: "colorPalette.300", _dark: "colorPalette.200/10" },
      },
      outline: {
        borderWidth: "1px",
        color: { base: "colorPalette.800", _dark: "colorPalette.300" },
      },
      subtle: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        color: { base: "colorPalette.800", _dark: "colorPalette.300" },
      },
      plain: {
        color: "colorPalette.600",
      },
    },
    size: {
      sm: {
        "--kbd-border": "1.5px",
        fontSize: "0.725em",
        px: "0.25em",
        borderRadius: "xs",
      },
      md: {
        "--kbd-border": "2px",
        fontSize: "0.875em",
        px: "0.4em",
        borderRadius: "sm",
      },
      lg: {
        "--kbd-border": "3px",
        fontSize: "1em",
        px: "0.4em",
        borderRadius: "sm",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "raised",
    colorPalette: "gray",
  },
})
