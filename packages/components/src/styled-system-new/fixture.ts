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
        green: {
          300: { value: "#68D391" },
          400: { value: "#48BB78" },
          500: { value: "#38A169" },
        },
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
    recipes: {
      Button: {
        base: {
          paddingX: 3,
          paddingY: 2,
          borderRadius: "6px",
          fontSize: "2",
          fontWeight: "500",
          fontFamily: "Inter",
        },
        variants: {
          size: {
            sm: { paddingX: 2, paddingY: 1 },
            md: { paddingX: 3, paddingY: 2 },
            lg: { paddingX: 4, paddingY: 3 },
          },
          variant: {
            solid: { bg: "primary", color: "white" },
            outline: { bg: "transparent", color: "primary" },
            ghost: { bg: "transparent", color: "primary" },
            link: { bg: "transparent", color: "primary" },
          },
          shape: {
            rounded: { borderRadius: "md" },
            pill: { borderRadius: "full" },
            square: { borderRadius: "none" },
          },
        },
      },
    },
    slotRecipes: {
      Alert: {
        slots: ["root", "title"],
        base: {
          root: {
            fontSize: "2",
            borderWidth: "1px",
            padding: "16px",
          },
          title: {
            fontWeight: "400",
            lineHeight: "1",
          },
        },
        variants: {
          status: {
            info: {
              root: {
                borderColor: "blue",
                bg: "lightblue",
              },
              title: {
                color: "blue",
              },
            },
            warning: {
              root: {
                borderColor: "orange",
                bg: "darkorange",
              },
              title: {
                color: "orange",
              },
            },
          },
        },
        defaultVariants: {
          status: "info",
        },
      },
    },
  },
})
