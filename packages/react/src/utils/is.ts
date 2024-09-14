// Array assertions
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value)
}

// Object assertions
export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  )
}

export function isCssVar(value: string): boolean {
  return /^var\(--.+\)$/.test(value)
}

// String assertions
export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]"
}

// Function assertions
export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === "function"
}
