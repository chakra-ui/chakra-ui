export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

// Object assertions
export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  )
}

// Array assertions
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value)
}
