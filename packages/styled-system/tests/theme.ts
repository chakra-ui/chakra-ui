import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

export const createTheme = (direction: "rtl" | "ltr") => ({
  direction,
  breakpoints,
  space: {
    sm: 40,
    md: 64,
    lg: 80,
  },
  colors: {
    pinkish: "#dfsdds",
  },
})
