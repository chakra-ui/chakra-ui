import { createBreakpoints } from "@chakra-ui/theme-tools"

export const breakpoints = createBreakpoints({
  base: "0px",
  sm: "100px",
  md: "200px",
  lg: "300px",
  xl: "400px",
  customBreakpoint: "500px",
})

export const theme = { breakpoints }

export const queries = {
  base: "(min-width: 0px) and (max-width: 99.99px)",
  sm: "(min-width: 100px) and (max-width: 199.99px)",
  md: "(min-width: 200px) and (max-width: 299.99px)",
  lg: "(min-width: 300px) and (max-width: 399.99px)",
  xl: "(min-width: 400px) and (max-width: 499.99px)",
  customBreakpoint: "(min-width: 500px)",
}
