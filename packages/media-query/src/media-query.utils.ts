import { Dict } from "@chakra-ui/utils"

const breakpoints = ["base", "sm", "md", "lg", "xl"]

export function getClosestValue(values: any, breakpoint: string) {
  let index = Object.keys(values).indexOf(breakpoint)

  if (index !== -1) return values[breakpoint]

  let stopIndex = breakpoints.indexOf(breakpoint)
  let hasFound = false

  while (stopIndex >= 0 && !hasFound) {
    const key = breakpoints[stopIndex]
    if (values[key] != null) {
      index = stopIndex
      hasFound = true
    }
    stopIndex--
  }

  if (index !== -1) {
    const key = breakpoints[index]
    return values[key]
  }

  return undefined
}

export function arrayToObject(values: any[]) {
  const result = {} as Dict
  values.forEach((value, index) => {
    const key = breakpoints[index]
    if (value == null) return
    result[key] = value
  })
  return result
}
