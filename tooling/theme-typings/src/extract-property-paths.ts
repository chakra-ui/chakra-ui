import { isObject } from "@chakra-ui/utils"

function wrapWithQuotes(value: unknown) {
  return `"${value}"`
}

function printUnionType(values: string[]) {
  if (!values.length) {
    return "never"
  }

  return values.map(wrapWithQuotes).join(" | ")
}

export function printUnionMap(unions: Record<string, string[]>) {
  return Object.entries(unions)
    .map(([targetKey, union]) => `${targetKey}: ${printUnionType(union)};`)
    .join("\n")
}

export function extractPropertyPaths(target: object, maxDepth = 1) {
  if (!maxDepth) {
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
