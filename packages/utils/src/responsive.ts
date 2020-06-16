import { isArray, isObject } from "./assertion"
import { Dict } from "./types"
import { objectKeys } from "./object"

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return removeNullValues(prop).map(mapper)
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key])
      return result
    }, {})
  }

  if (prop != null) {
    return mapper(prop)
  }

  return null
}

// ["1px", null, "2px"] becomes ["1px", "1px", "2px"]
function removeNullValues(prop: any[]): any[] {
  return prop.reduce((acc: string[], x: string) => {
    if (x == null) {
      let last = acc.length !== 0 ? acc[acc.length - 1] : x
      return [...acc.slice(0, -1), last, last]
    }
    return [...acc, x]
  }, [])
}
