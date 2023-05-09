import { isColorHue } from "../../utils/is-color-hue"
import { isObject } from "../../utils/is-object"

/**
 * Extract color scheme names
 * by validating that every property of type ColorHue is in the object
 */
export function extractColorSchemeTypes(theme: Record<string, unknown>) {
  const { colors } = theme
  if (!isObject(colors)) {
    return []
  }

  return Object.entries(colors).reduce(
    (acc: string[], [colorName, colorValues]) => {
      if (isColorHue(colorValues)) {
        acc.push(colorName)
      }

      return acc
    },
    [],
  )
}
