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
  base: "(min-width: 0px) and (max-width: 99.98px)",
  sm: "(min-width: 100px) and (max-width: 199.98px)",
  md: "(min-width: 200px) and (max-width: 299.98px)",
  lg: "(min-width: 300px) and (max-width: 399.98px)",
  xl: "(min-width: 400px) and (max-width: 499.98px)",
  "2xl": "(min-width: 500px) and (max-width: 599.98px)",
  customBreakpoint: "(min-width: 600px)",
}
