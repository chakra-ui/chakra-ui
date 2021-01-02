import { isObject } from "@chakra-ui/utils"
import { formatWithPrettierIfAvailable } from "./format-with-prettier"

export interface ThemeKeyOptions {
  /**
   * Property key in the theme object
   * @example colors
   */
  key: string
  /**
   * Maximum extraction level
   * @example
   * union: gray.500
   * level: 1---|2--|
   * @default 1
   */
  maxScanDepth?: number
}

function wrapWithQuotes(value: unknown) {
  return `"${value}"`
}

function printUnionType(values: string[]) {
  return values.map(wrapWithQuotes).join(" | ")
}

function printUnionMap(unions: Record<string, string[]>) {
  return Object.entries(unions)
    .filter(([, union]) => union.length)
    .map(([targetKey, union]) => `${targetKey}: ${printUnionType(union)};`)
    .join("\n")
}

function extractPropertyPaths(target: object, maxDepth = 1) {
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

export interface CreateThemeTypingsInterfaceOptions {
  themeKeys: ThemeKeyOptions[]
}

export async function createThemeTypingsInterface(
  theme: Record<string, unknown>,
  { themeKeys }: CreateThemeTypingsInterfaceOptions,
) {
  const unions = themeKeys.reduce((allUnions, { key, maxScanDepth }) => {
    const target = theme[key]
    if (isObject(target)) {
      allUnions[key] = extractPropertyPaths(target, maxScanDepth)
    }
    return allUnions
  }, {} as Record<string, string[]>)

  const template =
    // language=ts
    `// regenerate by running
// npx @chakra-ui/theme-typings --out <out-dir> path/to/your/theme.(js|ts)
import "@chakra-ui/styled-system"

declare module "@chakra-ui/styled-system" {
  export interface ThemeTypings {
    ${printUnionMap(unions)}
  }
}
`

  return formatWithPrettierIfAvailable(template)
}
