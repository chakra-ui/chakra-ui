import { isObject } from "./is"
import { walkObject } from "./walk-object"

export function mapObject(obj: any, fn: (value: any) => any) {
  if (!isObject(obj)) return fn(obj)
  return walkObject(obj, (value) => fn(value))
}
