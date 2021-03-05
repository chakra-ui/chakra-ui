import { getLastItem } from "./array"
import { isArray, isNumber, isObject } from "./assertion"
import { fromEntries, objectKeys } from "./object"
import { Dict } from "./types"

export const breakpoints = Object.freeze([
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
])

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map((item) => {
      if (item === null) {
        return null
      }
      return mapper(item)
    })
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key])
      return result
    }, {})
  }

  if (prop != null) {
    return mapper(prop)
  }

  return null
}

export function objectToArrayNotation(obj: Dict, bps = breakpoints) {
  const result = bps.map((br) => obj[br] ?? null)
  while (getLastItem(result) === null) {
    result.pop()
  }
  return result
}

export function arrayToObjectNotation(values: any[], bps = breakpoints) {
  const result = {} as Dict
  values.forEach((value, index) => {
    const key = bps[index]
    if (value == null) return
    result[key] = value
  })
  return result
}

export function isResponsiveObjectLike(obj: Dict, bps = breakpoints) {
  const keys = Object.keys(obj)
  return keys.length > 0 && keys.every((key) => bps.includes(key))
}

/**
 * @note
 * The code below is the recommended way to analyze breakpoints
 * related stuff. Avoid using functions above, it'll be removed in the
 * next major
 */

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

export const px = (value: number | string): string => {
  if (value == null) return value
  const { unitless } = analyzeCSSValue(value)
  return unitless || isNumber(value) ? `${value}px` : value
}

const sortByBreakpointValue = (a: any[], b: any[]) =>
  parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1

const sortBps = (breakpoints: Dict): Dict =>
  fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue))

function normalize(breakpoints: Dict) {
  const sorted = sortBps(breakpoints)
  return Object.assign(Object.values(sorted), sorted) as string[]
}

function keys(breakpoints: Dict) {
  const value = Object.keys(sortBps(breakpoints))
  return new Set(value)
}

function subtract(value: string) {
  if (!value) return value
  value = px(value)
  const factor = value.endsWith("px")
    ? -1
    : // the equivalent of 1px in em using a 16px base
      -0.0635
  return isNumber(value)
    ? `${value + factor}`
    : value.replace(/(\d+\.?\d*)/u, (m) => `${parseFloat(m) + factor}`)
}

function queryString(min: string | null, max?: string) {
  const query = []

  if (min) query.push(`@media screen and (min-width: ${px(min)})`)
  if (query.length > 0 && max) query.push("and")
  if (max) query.push(`@media screen and (max-width: ${px(max)})`)

  return query.join(" ")
}

export function analyzeBreakpoints(breakpoints: Dict) {
  if (!breakpoints) return null

  breakpoints.base = breakpoints.base ?? "0px"

  const normalized = normalize(breakpoints)

  const queries = Object.entries(breakpoints)
    .sort(sortByBreakpointValue)
    .map(([breakpoint, minW], index, entry) => {
      let [, maxW] = entry[index + 1] ?? []
      maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined
      return {
        breakpoint,
        minW,
        maxW,
        maxWQuery: queryString(null, maxW),
        minWQuery: queryString(minW),
        minMaxQuery: queryString(minW, maxW),
      }
    })

  const _keys = keys(breakpoints)
  const _keysArr = Array.from(_keys.values())

  return {
    keys: _keys,
    normalized,
    isResponsive(test: Dict) {
      const keys = Object.keys(test)
      return keys.length > 0 && keys.every((key) => _keys.has(key))
    },
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    media: [null, ...normalized.map((minW) => queryString(minW)).slice(1)],
    toArrayValue(test: Dict) {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object")
      }
      const result = _keysArr.map((bp) => test[bp] ?? null)
      while (getLastItem(result) === null) result.pop()
      return result
    },
    toObjectValue(test: any[]) {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array")
      }
      return test.reduce((acc, value, index) => {
        const key = _keysArr[index]
        if (key != null && value != null) acc[key] = value
        return acc
      }, {} as Dict)
    },
  }
}

export type AnalyzeBreakpointsReturn = ReturnType<typeof analyzeBreakpoints>

/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */
export const isCustomBreakpoint = (maybeBreakpoint: string) =>
  Number.isNaN(Number(maybeBreakpoint))
