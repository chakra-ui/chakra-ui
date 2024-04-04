import { defineRecipe } from "../../styled-system"

export const kbdRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    lineHeight: "normal",
    fontFamily: "mono",
    flexShrink: 0,
    whiteSpace: "nowrap",
    wordSpacing: "-0.5em",
    userSelect: "none",
    verticalAlign: "text-top",
    colorPalette: "gray",
  },
  variants: {
    variant: {
      raised: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
        borderWidth: "1px",
        borderBottomWidth: "3px",
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
        fontSize: "0.6em",
        px: "0.25em",
        borderRadius: "xs",
      },
      md: {
        fontSize: "0.8em",
        px: "0.4em",
        borderRadius: "sm",
      },
      lg: {
        fontSize: "0.9em",
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
