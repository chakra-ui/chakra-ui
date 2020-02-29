import { isString } from "@chakra-ui/utils"

/**
 * Converts a breakpoint unit to css media query string
 * @param breakpoint breakpoint as number or css unit
 */
export const toMediaQuery = (breakpoint: string | number) => {
  const str = isString(breakpoint) ? breakpoint : `${breakpoint}px`
  return `@media screen and (min-width: ${str})`
}

/**
 * Format the breakpoints object in theme to
 * array and object css media query string
 *
 * @param breakpoints the breakpoints in the theme
 */
export function getMediaQuery(breakpoints: Record<any, any>) {
  const _breakpoints = breakpoints ?? { sm: "40em", md: "52em", lg: "64em" }

  const asArray = Object.keys(_breakpoints)
    .map(key => _breakpoints[key as keyof typeof _breakpoints])
    .sort((a, b) => a - b)
    .map(toMediaQuery)

  const asObject = Object.keys(_breakpoints).reduce((result, point) => {
    result[point] = toMediaQuery(_breakpoints[point])
    return result
  }, {} as any)

  return { asArray, asObject }
}
