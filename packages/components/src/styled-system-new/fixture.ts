import { presetBase } from "./preset-base"
import { createSystem } from "./system"

export const systemBase = createSystem({
  ...presetBase,
  theme: {
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    breakpoints: {
      sm: "@media screen and (min-width: 40em)",
      md: "@media screen and (min-width: 52em)",
      lg: "@media screen and (min-width: 64em)",
      xl: "@media screen and (min-width: 80em)",
    },
    tokens: {
      colors: {
        red: { 300: { value: "#red300" } },
        pink: { 400: { value: "#pink400" } },
        primary: { value: "tomato" },
        secondary: { value: "cyan" },
      },
      fontSizes: {
        0: { value: "12px" },
        1: { value: "14px" },
        2: { value: "16px" },
        3: { value: "24px" },
        4: { value: "36px" },
      },
      spacing: {
        0: { value: "0" },
        1: { value: "4px" },
        2: { value: "8px" },
        3: { value: "16px" },
        4: { value: "32px" },
        5: { value: "64px" },
        6: { value: "128px" },
        7: { value: "256px" },
        8: { value: "512px" },
      },
      sizes: {
        small: { value: "4px" },
        medium: { value: "8px" },
        large: { value: "16px" },
        sidebar: { value: "320px" },
      },
    },
    semanticTokens: {},
    layerStyles: {
      v1: {
        value: {
          color: "red.300",
          bg: "tomato",
        },
      },
    },
    textStyles: {
      caps: {
        value: {
          textTransform: "uppercase",
          letterSpacing: "wide",
          fontSize: "lg",
        },
      },
      lower: {
        value: {
          textTransform: "lowercase",
          letterSpacing: "0.2px",
          fontSize: "sm",
        },
      },
    },
  },
})
