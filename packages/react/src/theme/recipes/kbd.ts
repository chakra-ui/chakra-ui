import { defineRecipe } from "../../styled-system"

export const kbdRecipe = defineRecipe({
  className: "chakra-kbd",
  base: {
    display: "inline-flex",
    alignItems: "center",
    fontWeight: "medium",
    fontFamily: "mono",
    flexShrink: "0",
    whiteSpace: "nowrap",
    wordSpacing: "-0.5em",
    userSelect: "none",
    px: "1",
    borderRadius: "l2",
  },

  variants: {
    variant: {
      raised: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        borderWidth: "1px",
        borderBottomWidth: "2px",
        borderColor: "colorPalette.muted",
      },
      outline: {
        borderWidth: "1px",
        color: "colorPalette.fg",
      },
      subtle: {
        bg: "colorPalette.muted",
        color: "colorPalette.fg",
      },
      plain: {
        color: "colorPalette.fg",
      },
    },

    size: {
      sm: {
        textStyle: "xs",
        height: "4.5",
      },
      md: {
        textStyle: "sm",
        height: "5",
      },
      lg: {
        textStyle: "md",
        height: "6",
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "raised",
  },
})
