import { Dict } from "./types"

// Number assertions
export function isNumber(value: any): value is number {
  return typeof value === "number"
}

export function isNotNumber(value: any) {
  return (
    typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)
  )
}

export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0
}

// Array assertions
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value)
}

export function isEmptyArray(value: any) {
  return isArray(value) && value.length === 0
}

// Function assertions
export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === "function"
}

// Generic assertions
export function isDefined(value: any) {
  return typeof value !== "undefined" && value !== undefined
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined" || value === undefined
}

// Object assertions
export function isObject(value: any): value is Dict {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  )
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0
}

export function isNotEmptyObject(value: any): value is object {
  return value && !isEmptyObject(value)
}

export function isNull(value: any): value is null {
  return value == null
}

// String assertions
export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]"
}

export function isCssVar(value: string): boolean {
  return /^var\(--.+\)$/.test(value)
}

// Empty assertions
export function isEmpty(value: any): boolean {
  if (isArray(value)) return isEmptyArray(value)
  if (isObject(value)) return isEmptyObject(value)
  if (value == null || value === "") return true
  return false
}

export const __DEV__ = process.env.NODE_ENV !== "production"

export const __TEST__ = process.env.NODE_ENV === "test"

export function isRefObject(val: any): val is { current: any } {
  return "current" in val
}

export function isInputEvent(
  value: any,
): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target)
}
