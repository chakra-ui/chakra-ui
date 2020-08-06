export const breakpoints: any = ["100px", "200px", "300px", "400px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export const theme = { breakpoints }

export const queries = {
  base: "(min-width: 0px) and (max-width: 99.99px)",
  sm: "(min-width: 100px) and (max-width: 199.99px)",
  md: "(min-width: 200px) and (max-width: 299.99px)",
  lg: "(min-width: 300px) and (max-width: 399.99px)",
  xl: "(min-width: 400px)",
}
