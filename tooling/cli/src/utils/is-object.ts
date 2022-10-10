type Dict<T = any> = Record<string, T>

export function isObject(value: any): value is Dict {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  )
}
