import { isObject } from "../../utils/is-object"
import { printUnionType } from "../../utils/print-union-type"

/**
 * @example
 * { colors: ['red.500', 'green.500'] } => `colors: "red.500" | "green.500"`
 */
export function printUnionMap(
  unions: Record<string, string[]>,
  strict = false,
) {
  return Object.entries(unions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([targetKey, union]) => `${targetKey}: ${printUnionType(union, strict)};`,
    )
    .join("\n")
}

/**
 * Extract recursively all property paths with a max depth
 */
export function extractPropertyPaths(target: unknown, maxDepth = 3) {
  if ((!isObject(target) && !Array.isArray(target)) || !maxDepth) {
    return []
  }

  return Object.entries(target).reduce((allPropertyPaths, [key, value]) => {
    if (isObject(value)) {
      extractPropertyPaths(value, maxDepth - 1).forEach((childKey) =>
        // e.g. gray.500
        allPropertyPaths.push(`${key}.${childKey}`),
      )
    } else {
      // e.g. transparent
      allPropertyPaths.push(key)
    }

    return allPropertyPaths
  }, [] as string[])
}
