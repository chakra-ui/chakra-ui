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

export const widths = {
  base: 99,
  sm: 199,
  md: 299,
  lg: 399,
  xl: 499,
  "2xl": 599,
  customBreakpoint: 699,
}
