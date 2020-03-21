import { isArray, isObject, __DEV__ } from "./assertion"
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
  if (options.condition && __DEV__) {
    console.warn(options.message)
  }
}

export function error(options: { condition: boolean; message: string }) {
  if (options.condition && __DEV__) {
    throw new Error(options.message)
  }
}

export { default as deepmerge } from "deepmerge"
