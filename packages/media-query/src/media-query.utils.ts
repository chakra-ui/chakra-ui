import { breakpoints as defaultBreakPoints } from "@chakra-ui/breakpoint-utils"

export function getClosestValue<T = any>(
  values: Record<string, T>,
  breakpoint: string,
  breakpoints = defaultBreakPoints,
) {
  let index = Object.keys(values).indexOf(breakpoint)

  if (index !== -1) {
    return values[breakpoint]
  }

  let stopIndex = breakpoints.indexOf(breakpoint)

  while (stopIndex >= 0) {
    const key = breakpoints[stopIndex]

    if (values.hasOwnProperty(key)) {
      index = stopIndex
      break
    }
    stopIndex -= 1
  }

  if (index !== -1) {
    const key = breakpoints[index]
    return values[key]
  }

  return undefined
}
