/**
 * Breakpoints for responsive design
 */
const breakpoints: any = ["30em", "48em", "62em", "80em"]

/**
 * This is needed for object responsive breakpoints to work.
 * At the moment, we require the keys to be `sm`, `md`, `lg` and `xl`
 */
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export default breakpoints
