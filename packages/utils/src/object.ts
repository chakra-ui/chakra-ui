import { Omit, Dict } from "./types"

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {}

  for (const key in object) {
    if (keys.includes(key as any)) continue
    result[key] = object[key]
  }

  return result as Omit<T, K>
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] }
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key]
    }
  }
  return result
}
