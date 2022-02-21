import {
  Anatomy,
  PartsStyleInterpolation,
  SystemStyleInterpolation,
} from "@chakra-ui/theme-tools"
import { Dict, isObject } from "@chakra-ui/utils"

import type { ChakraTheme } from "./theme.types"

export const requiredChakraThemeKeys: (keyof ChakraTheme)[] = [
  "borders",
  "breakpoints",
  "colors",
  "components",
  "config",
  "direction",
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "radii",
  "shadows",
  "sizes",
  "space",
  "styles",
  "transition",
  "zIndices",
]

export function isChakraTheme(unit: unknown): unit is ChakraTheme {
  if (!isObject(unit)) {
    return false
  }

  return requiredChakraThemeKeys.every((propertyName) =>
    Object.prototype.hasOwnProperty.call(unit, propertyName),
  )
}

export function getComponentBaseStyle(
  theme: Dict<any>,
  componentName: string,
): SystemStyleInterpolation | PartsStyleInterpolation<Anatomy> | undefined {
  const { components } = theme
  const component = components[componentName]
  const { baseStyle } = component

  return baseStyle
}
