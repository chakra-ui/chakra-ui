import { isObject } from "@chakra-ui/utils"
import { formatWithPrettierIfAvailable } from "./format-with-prettier"
import { extractPropertyPaths, printUnionMap } from "./extract-property-paths"
import {
  extractComponentTypes,
  printComponentTypes,
} from "./extract-component-types"

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

  const componentTypes = extractComponentTypes(theme)

  const template =
    // language=ts
    `// regenerate by running
// npx @chakra-ui/theme-typings --out <out-dir> path/to/your/theme.(js|ts)
import "@chakra-ui/styled-system"

declare module "@chakra-ui/styled-system" {
  export interface ThemeTypings {
    ${printUnionMap(unions)}
    ${printComponentTypes(componentTypes)}
  }
}
`

  return formatWithPrettierIfAvailable(template)
}
