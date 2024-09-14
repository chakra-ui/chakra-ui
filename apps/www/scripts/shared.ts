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
