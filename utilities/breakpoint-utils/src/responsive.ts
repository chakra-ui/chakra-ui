import { isObject } from "@chakra-ui/shared-utils"

function getLastItem<T>(array: T[]): T | undefined {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export const breakpoints = Object.freeze([
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
])

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (Array.isArray(prop)) {
    return prop.map((item) => {
      if (item === null) {
        return null
      }
      return mapper(item)
    })
  }

  if (isObject(prop)) {
    return Object.keys(prop).reduce((result: Record<string, any>, key) => {
      result[key] = mapper(prop[key])
      return result
    }, {})
  }

  if (prop != null) {
    return mapper(prop)
  }

  return null
}

export function objectToArrayNotation(
  obj: Record<string, any>,
  bps = breakpoints,
) {
  const result = bps.map((br) => obj[br] ?? null)
  while (getLastItem(result) === null) {
    result.pop()
  }
  return result
}

export function arrayToObjectNotation(values: any[], bps = breakpoints) {
  const result = {} as Record<string, any>
  values.forEach((value, index) => {
    const key = bps[index]
    if (value == null) return
    result[key] = value
  })
  return result
}

export function isResponsiveObjectLike(
  obj: Record<string, any>,
  bps = breakpoints,
) {
  const keys = Object.keys(obj)
  return keys.length > 0 && keys.every((key) => bps.includes(key))
}

/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */
export const isCustomBreakpoint = (maybeBreakpoint: string) =>
  Number.isNaN(Number(maybeBreakpoint))
