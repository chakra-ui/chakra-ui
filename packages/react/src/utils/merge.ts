import { clone } from "./clone"
import { isObject } from "./is"

function merge(target: any, source: any): any {
  if (source == null) return target
  for (const key of Object.keys(source)) {
    if (source[key] === undefined || key === "__proto__") continue
    if (!isObject(target[key]) && isObject(source[key])) {
      // Clone: assigning by reference would let a later merge write into
      // the source object (e.g. `mergeCva` mutating the first recipe config).
      Object.assign(target, { [key]: clone(source[key]) })
    } else if (target[key] && isObject(source[key])) {
      merge(target[key], source[key])
    } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
      let i = 0
      for (; i < source[key].length; i++) {
        if (isObject(target[key][i]) && isObject(source[key][i])) {
          merge(target[key][i], source[key][i])
        } else {
          target[key][i] = clone(source[key][i])
        }
      }
    } else {
      Object.assign(target, { [key]: clone(source[key]) })
    }
  }

  return target
}

export function mergeWith(target: any, ...sources: any[]): any {
  for (const source of sources) {
    merge(target, source)
  }
  return target
}
