import { getLastItem } from "./array"
import { isNumber, isObject } from "./assertion"
import { fromEntries } from "./object"
import { Dict } from "./types"

function analyzeCSSValue(value: number | string) {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

export function px(value: number | string | null): string | null {
  if (value == null) return value as string | null
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
  value = px(value) ?? value
  const factor = value.endsWith("px")
    ? -0.02
    : // the equivalent of 0.02px in em using a 2px base
      -0.01
  return isNumber(value)
    ? `${value + factor}`
    : value.replace(/(\d+\.?\d*)/u, (m) => `${parseFloat(m) + factor}`)
}

export function toMediaQueryString(min: string | null, max?: string) {
  const query = ["@media screen"]

  if (min) query.push("and", `(min-width: ${px(min)})`)
  if (max) query.push("and", `(max-width: ${px(max)})`)

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
        _minW: subtract(minW),
        breakpoint,
        minW,
        maxW,
        maxWQuery: toMediaQueryString(null, maxW),
        minWQuery: toMediaQueryString(minW),
        minMaxQuery: toMediaQueryString(minW, maxW),
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
    media: [
      null,
      ...normalized.map((minW) => toMediaQueryString(minW)).slice(1),
    ],
    /**
     * Converts the object responsive syntax to array syntax
     *
     * @example
     * toArrayValue({ base: 1, sm: 2, md: 3 }) // => [1, 2, 3]
     */
    toArrayValue(test: Dict) {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object")
      }
      const result = _keysArr.map((bp) => test[bp] ?? null)
      while (getLastItem(result) === null) {
        result.pop()
      }
      return result
    },
    /**
     * Converts the array responsive syntax to object syntax
     *
     * @example
     * toObjectValue([1, 2, 3]) // => { base: 1, sm: 2, md: 3 }
     */
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
