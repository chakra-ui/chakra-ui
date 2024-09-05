import { defineRecipe } from "../../styled-system"

export const kbdRecipe = defineRecipe({
  className: "chakra-kbd",
  base: {
    fontWeight: "medium",
    lineHeight: "normal",
    fontFamily: "mono",
    flexShrink: 0,
    whiteSpace: "nowrap",
    wordSpacing: "-0.5em",
    userSelect: "none",
    py: "0.2em",
  },

  variants: {
    variant: {
      raised: {
        bg: "colorPalette.muted",
        color: "colorPalette.fg",
        borderWidth: "1px",
        borderBottomWidth: "var(--kbd-border)",
        borderColor: "colorPalette.emphasized",
      },
      outline: {
        borderWidth: "1px",
        color: "colorPalette.fg",
      },
      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
      },
      plain: {},
    },

    size: {
      sm: {
        "--kbd-border": "2px",
        fontSize: "0.725em",
        px: "0.3em",
        borderRadius: "sm",
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
  },
})
