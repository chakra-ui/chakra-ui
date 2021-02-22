import { toCSSVariables } from "../src/css-var"

export const createTheme = (direction: "rtl" | "ltr") =>
  toCSSVariables({
    direction,
    breakpoints: {
      sm: "40em",
      md: "52em",
      lg: "64em",
      xl: "80em",
    },
    space: {
      sm: 40,
      md: 64,
      lg: 80,
    },
    colors: {
      pinkish: "#dfsdds",
    },
  })
