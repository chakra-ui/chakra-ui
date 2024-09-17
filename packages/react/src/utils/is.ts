export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  )
}

export function isCssVar(value: string): boolean {
  return /^var\(--.+\)$/.test(value)
}

export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]"
}

export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === "function"
}
