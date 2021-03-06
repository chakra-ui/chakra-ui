import { isObject } from "@chakra-ui/utils"
import { ChakraTheme } from "./theme.types"

export const requiredChakraThemeKeys: (keyof ChakraTheme)[] = [
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "borders",
  "breakpoints",
  "colors",
  "radii",
  "shadows",
  "sizes",
  "space",
  "transition",
  "zIndices",
  "config",
  "direction",
]

export function isChakraTheme(unit: unknown): unit is ChakraTheme {
  if (!isObject(unit)) {
    return false
  }

  return requiredChakraThemeKeys.every((propertyName) =>
    unit.hasOwnProperty(propertyName),
  )
}
