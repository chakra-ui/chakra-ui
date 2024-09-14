import { isObject } from "./is"

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
    return prop.map((item) => (item === null ? null : mapper(item)))
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

export function arrayToObjectNotation(values: any[], bps = breakpoints) {
  const result = {} as Record<string, any>
  values.forEach((value, index) => {
    const key = bps[index]
    if (value == null) return
    result[key] = value
  })
  return result
}
