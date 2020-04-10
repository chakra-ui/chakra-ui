import { isArray, isObject } from "./assertion"
import { Dict } from "./types"

export function mapResponsive(prop: any, mapper: (val: any) => any) {
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
