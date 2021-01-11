import { isObject } from "@chakra-ui/utils"
import { formatWithPrettierIfAvailable } from "./format-with-prettier"
import { extractPropertyPaths, printUnionMap } from "./extract-property-paths"
import {
  extractComponentTypes,
  printComponentTypes,
} from "./extract-component-types"
import { extractColorSchemeTypes } from "./extract-color-schemes"

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

  filter?: (value: string) => boolean
}

export interface CreateThemeTypingsInterfaceOptions {
  themeKeys: ThemeKeyOptions[]
}

export async function createThemeTypingsInterface(
  theme: Record<string, unknown>,
  { themeKeys }: CreateThemeTypingsInterfaceOptions,
) {
  const unions = themeKeys.reduce(
    (allUnions, { key, maxScanDepth, filter }) => {
      const target = theme[key]
      if (isObject(target) || Array.isArray(target)) {
        allUnions[key] = extractPropertyPaths(target, maxScanDepth).filter(
          filter ?? (() => true),
        )
      }
      return allUnions
    },
    {} as Record<string, string[]>,
  )

  const componentTypes = extractComponentTypes(theme)
  const colorSchemes = extractColorSchemeTypes(theme)

  const template =
    // language=ts
    `// regenerate by running
// npx @chakra-ui/theme-typings --out <out-dir> path/to/your/theme.(js|ts)
export interface ThemeTypings {
  ${printUnionMap(unions)}
  ${printUnionMap({ colorSchemes })}
  ${printComponentTypes(componentTypes)}
}

`

  return formatWithPrettierIfAvailable(template)
}
