import { isArray, isObject } from "./assertion"
import { Dict } from "./types"
import { objectKeys, merge } from "./object"
import { getLastItem } from "./array"

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map((item) => {
      if (item === null) {
        return null
      }
      return mapper(item)
    })
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

export function objectToArrayNotation(obj: Dict) {
  const base = [
    ["base", null],
    ["sm", null],
    ["md", null],
    ["lg", null],
  ]

  const entries = merge(base, Object.entries(obj))
  const mergedObj = Object.fromEntries(entries)
  let array = Object.values(mergedObj)

  let isNullBetweenValues = false

  array.forEach((item, index) => {
    const next = array[index + 1]
    if (item === null && next != null) {
      isNullBetweenValues = true
    }
  })

  if (!isNullBetweenValues) {
    array = array.filter((item) => item !== null)
  }

  while (getLastItem(array) === null) {
    array.pop()
  }

  return array
}
