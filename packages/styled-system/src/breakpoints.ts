/* eslint-disable eqeqeq */
import {
  Dict,
  fromEntries,
  getLastItem,
  isNumber,
  isObject,
} from "@chakra-ui/utils"

const sortFn = (a: any[], b: any[]) =>
  parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1

const sortBps = (breakpoints: Dict): Dict =>
  fromEntries(Object.entries(breakpoints).sort(sortFn))

function normalize(breakpoints: Dict) {
  const sorted = sortBps(breakpoints)
  return Object.assign(Object.values(sorted), sorted) as string[]
}

function keys(breakpoints: Dict) {
  const value = Object.keys(sortBps(breakpoints))
  return new Set(value)
}

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

const px = (value: number | string): string => {
  const { unitless } = analyzeCSSValue(value)
  return unitless || isNumber(value) ? `${value}px` : value
}

function subtract(value: string) {
  if (!value) return value
  value = px(value)
  const factor = value.endsWith("px") ? -1 : -0.0635
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

export function analyzeBreakpoints(breakpoints: Record<string, any>) {
  if (breakpoints.processed) {
    breakpoints = breakpoints.values
  }

  breakpoints.base = "0px"

  const normalized = normalize(breakpoints)

  const queries = Object.entries(breakpoints)
    .sort(sortFn)
    .map(([bp, minW], index, arr) => {
      let [, maxW] = arr[index + 1] ?? []
      maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined
      return {
        breakpoint: bp,
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
      if (!Array.isArray) {
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

export type BreakpointReturn = ReturnType<typeof analyzeBreakpoints>

export default analyzeBreakpoints
