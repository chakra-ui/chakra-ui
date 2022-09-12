import { theme as baseTheme } from "@chakra-ui/theme"

export const breakpoints = {
  base: "0px",
  sm: "100px",
  md: "200px",
  lg: "300px",
  xl: "400px",
  "2xl": "600px",
  customBreakpoint: "500px",
}

export const theme = { ...baseTheme, breakpoints }

export const queries = {
  base: "(min-width: 0px)",
  sm: "(min-width: 100px)",
  md: "(min-width: 200px)",
  lg: "(min-width: 300px)",
  xl: "(min-width: 400px)",
  customBreakpoint: "(min-width: 500px)",
}
