import { mergeAndCompare, merge } from "merge-anything"

function isFunction(value: any): value is Function {
  return typeof value === "function"
}

function mergeFn(origin: any, override: any) {
  if (isFunction(origin) || isFunction(override)) {
    return (...args: any[]) => {
      const originValue = isFunction(origin) ? origin(...args) : origin
      const overrideValue = isFunction(override) ? override(...args) : override
      return mergeAndCompare(mergeFn, {}, originValue, overrideValue)
    }
  }

  if (Array.isArray(origin) || Array.isArray(override)) {
    return (origin ?? []).concat(override ?? [])
  }

  return override
}

function mergeWith(...overrides: any[]): any {
  return mergeAndCompare(mergeFn, {}, ...overrides)
}

export { merge, mergeWith }
