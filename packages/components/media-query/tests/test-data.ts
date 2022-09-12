import { theme as baseTheme } from "@chakra-ui/theme"

export const breakpoints = {
  base: "0px",
  sm: "100px",
  md: "200px",
  lg: "300px",
  xl: "400px",
  "2xl": "500px",
  customBreakpoint: "600px",
}

export const theme = { ...baseTheme, breakpoints }

export const queries = {
  base: "(min-width: 0px)",
  sm: "(min-width: 100px)",
  md: "(min-width: 200px)",
  lg: "(min-width: 300px)",
  xl: "(min-width: 400px)",
  "2xl": "(min-width: 500px)",
  customBreakpoint: "(min-width: 600px)",
}
