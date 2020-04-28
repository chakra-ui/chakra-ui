import { isString, Dict, objectKeys } from "@chakra-ui/utils"

/**
 * Converts a breakpoint unit to css media query string
 * @param breakpoint  - breakpoint as number or css unit
 */
export const toMediaQuery = (breakpoint: string | number) => {
  const str = isString(breakpoint) ? breakpoint : `${breakpoint}px`
  return `@media screen and (min-width: ${str})`
}

/**
 * Format the breakpoints object in theme to
 * array and object css media query string
 *
 * @param breakpoints - the breakpoints in the theme
 * @param mapper - the function to convert each breakpoint to media query string
 */
export function getMediaQuery(breakpoints?: Dict, mapper = toMediaQuery) {
  const _breakpoints = breakpoints ?? { sm: "40em", md: "52em", lg: "64em" }

  const asArray = objectKeys(_breakpoints)
    .map(key => _breakpoints[key])
    .sort((a, b) => a - b)
    .map(mapper)

  const asObject = objectKeys(_breakpoints).reduce((result, point) => {
    result[point] = mapper(_breakpoints[point])
    return result
  }, {} as Dict)

  return { asArray, asObject }
}
