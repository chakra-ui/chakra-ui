import { isArray, isObject } from "./assertion"
import { Dict } from "./types"

export function parseResponsiveProp(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map(mapper)
  }

  if (isObject(prop)) {
    return Object.keys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key])
      return result
    }, {})
  }

  if (prop != null) {
    return mapper(prop)
  }

  return null
}

export function warn(options: { condition: boolean; message: string }) {
  if (options.condition && process.env.NODE_ENV !== "production") {
    console.warn(options.message)
  }
}

export { default as deepmerge } from "deepmerge"
