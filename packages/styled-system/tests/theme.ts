import { toCSSVar } from "../src/css-var"

export const createTheme = (direction: "rtl" | "ltr") =>
  toCSSVar({
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
    sizes: {
      sm: "40px",
      md: "90px",
    },
    colors: {
      pinkish: "#dfsdds",
      redish: "#rrtffg",
    },
  })
