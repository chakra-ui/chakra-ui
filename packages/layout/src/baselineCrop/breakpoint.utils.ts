import { __DEV__, isArray, get as getFromTheme } from "@chakra-ui/utils"
import { Breakpoints } from "../layout.utils"

export function convertBreakpointsIntoArray(
  breakpoints: Breakpoints,
): string[] {
  return Object.keys(breakpoints)
    .sort((a, b) => parseInt(breakpoints[a]) - parseInt(breakpoints[b]))
    .map(key => breakpoints[key])
}

/**
 * convertToArray takes a given style property, like `lineHeight`, and converts it into an
 * equivalent styled-system responsive array
 *
 * @param theme - the styled-system theme object
 * @param value - the style value to convert to an array
 *
 * @example Examples can be found in the associated test file
 */
export function convertToArray<T>(
  theme: object,
  value: T | T[] | { [key: string]: T },
): T[] {
  const breakpoints: Breakpoints = getFromTheme(theme, "breakpoints")

  if (isArray(value)) {
    return value
  }

  if (value === undefined) {
    return []
  }

  if (typeof value === "object") {
    if (__DEV__) {
      // Perform some extra checks in development mode
      if (isArray(breakpoints)) {
        throw new Error(
          "When using `isBaselineCropped`, you must define your breakpoints as an object.",
        )
      }
      const breakpointUnits = Object.keys(breakpoints).map(key =>
        breakpoints[key].replace(/^\d+/, ""),
      )
      if (!breakpointUnits.every(unit => unit === breakpointUnits[0])) {
        throw new Error(
          `
          When using isBaselineCropped, you must define every breakpoint using the same unit.

          You provided the following breakpoints: ${JSON.stringify(breakpoints)}
          We calculated these units "${breakpointUnits}" which are not all the same.
          `,
        )
      }
    }
    // In order for the text crop feature to work, we must know the _order_ of the breakpoints,
    // so we convert the object breakpoints into
    const breakpointArray = convertBreakpointsIntoArray(breakpoints)

    /* If we receive a styled-system responsive style object, we want to manually convert it into
     an equivalent styled-system responsive style array */
    const breakpointKeys = Object.keys(value)
    const breakpointIndices = breakpointKeys.map(breakpoint =>
      breakpointArray.indexOf(breakpoints[breakpoint]),
    )
    const highestBreakpointIndex = Math.max(...breakpointIndices)
    const result: T[] = new Array(highestBreakpointIndex + 1).fill(null)
    breakpointKeys.forEach(breakpoint => {
      const i = breakpointArray.indexOf(breakpoints[breakpoint])
      result[i] = (value as { [key: string]: T })[breakpoint]
    })
    return result
  } else {
    return [value]
  }
}
