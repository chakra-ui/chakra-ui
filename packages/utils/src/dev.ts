import { isArray, isObject } from "./assertion"
import { Dict } from "./types"

export function parseResponsiveProp(
  value: any[] | Dict | string | number,
  fn: (val: any) => any,
) {
  if (isArray(value)) {
    return value.map(fn)
  }

  if (isObject(value)) {
    return Object.keys(value).reduce((result: Dict, key) => {
      result[key] = fn(value[key])
      return result
    }, {})
  }

  if (value != null) {
    return fn(value)
  }

  return null
}

export { default as deepmerge } from "deepmerge"
