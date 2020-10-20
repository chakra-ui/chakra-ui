import { ChangeEvent } from "react"
import { Dict } from "./types"

// Number assertions
export function isNumber(value: any): value is number {
  return typeof value === "number"
}

export const isNotNumber = (value: any) =>
  typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)

export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0
}

// Array assertions
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value)
}

export const isEmptyArray = (value: any) => isArray(value) && value.length === 0

// Function assertions
export function isFunction(value: any): value is Function {
  return typeof value === "function"
}

// Generic assertions
export const isDefined = (value: any) =>
  typeof value !== "undefined" && value !== undefined

export const isUndefined = (value: any): value is undefined =>
  typeof value === "undefined" || value === undefined

// Object assertions
export const isObject = (value: any): value is Dict => {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  )
}

export const isEmptyObject = (value: any) =>
  isObject(value) && Object.keys(value).length === 0

export function isNotEmptyObject(value: any): value is object {
  return value && !isEmptyObject(value)
}

export const isNull = (value: any): value is null => value == null

// String assertions
export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]"
}

// Event assertions
export function isInputEvent(value: any): value is ChangeEvent {
  return value && isObject(value) && isObject(value.target)
}

// Empty assertions
export const isEmpty = (value: any) => {
  if (isArray(value)) return isEmptyArray(value)
  if (isObject(value)) return isEmptyObject(value)
  if (value == null || value === "") return true
  return false
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __DEV__ = process.env.NODE_ENV !== "production"
