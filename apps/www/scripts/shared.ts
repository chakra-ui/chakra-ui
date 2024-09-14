import { camelCase, titleCase } from "scule"

export function stringify(obj: any) {
  return JSON.stringify(filterEmpty(obj), null, 2)
}

export function filterEmpty(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === null) return false
      if (typeof value === "object") return Object.keys(value).length > 0
      return true
    }),
  )
}

export const toComponentCase = (part: string) => {
  return titleCase(camelCase(part, { normalize: true }))
    .split(" ")
    .join("")
}

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0
}

export function mapEntries<A, B, K extends string | number | symbol>(
  obj: { [key in K]: A },
  f: (key: K, val: A) => [K, B],
): { [key in K]: B } {
  const result: { [key in K]: B } = {} as any
  for (const key in obj) {
    const kv = f(key, obj[key])
    result[kv[0]] = kv[1]
  }
  return result
}

export const uniq = <T>(...items: T[]) => {
  const _items = items.filter(Boolean)
  return Array.from(new Set(_items))
}
