import { isArray, isObject } from "./assertion"

export function flatten<Value = any>(
  target: Record<string, Value> | undefined | null,
  maxDepth = Infinity,
) {
  if ((!isObject(target) && !Array.isArray(target)) || !maxDepth) {
    return target
  }

  return Object.entries(target).reduce((result, [key, value]) => {
    if (isObject(value) || isArray(value)) {
      Object.entries(flatten(value, maxDepth - 1)).forEach(
        ([childKey, childValue]) => {
          // e.g. gray.500
          result[`${key}.${childKey}`] = childValue
        },
      )
    } else {
      // e.g. transparent
      result[key] = value
    }

    return result
  }, {} as any)
}
