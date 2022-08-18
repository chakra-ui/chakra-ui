import { mergeAndCompare } from "merge-anything"
export type Booleanish = boolean | "true" | "false"

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  )
}

function mergeFn(origin: any, override: any) {
  if (typeof origin === "function" || typeof override === "function") {
    return (...args: any[]) => {
      const originValue =
        typeof origin === "function" ? origin(...args) : origin
      const overrideValue =
        typeof override === "function" ? override(...args) : override
      return mergeAndCompare(mergeFn, {}, originValue, overrideValue)
    }
  }

  if (Array.isArray(origin) || Array.isArray(override)) {
    return (origin ?? []).concat(override ?? [])
  }

  return override
}

export function mergeWith(...overrides: any[]): any {
  return mergeAndCompare(mergeFn, {}, ...overrides)
}

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined
