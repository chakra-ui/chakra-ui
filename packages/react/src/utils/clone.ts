export function clone<T extends Record<string, any>>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj.map((prop) => clone(prop)) as any
  const _clone = Object.create(Object.getPrototypeOf(obj))
  for (const key of Object.keys(obj)) {
    _clone[key] = clone(obj[key])
  }
  return _clone
}
