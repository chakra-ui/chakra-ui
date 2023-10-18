import { isColorHue } from "../../utils/is-color-hue"
import { isObject } from "../../utils/is-object"

/**
 * Extract color scheme names
 * by validating that every property of type ColorHue is in the object
 */
export function extractColorSchemeTypes(
  theme: Record<string, unknown>,
  allowSemanticTokenColorsInColorSchemes: boolean,
) {
  const { colors, semanticTokens } = theme
  const colorSchemeNames: string[] = []

  if (isObject(colors)) {
    Object.entries(colors).reduce((acc: string[], [colorName, colorValues]) => {
      if (isColorHue(colorValues)) {
        acc.push(colorName)
      }

      return acc
    }, colorSchemeNames)
  }

  if (allowSemanticTokenColorsInColorSchemes && isObject(semanticTokens)) {
    const semanticColors = semanticTokens?.colors

    if (isObject(semanticColors)) {
      Object.entries(semanticColors).reduce((acc: string[], [colorName]) => {
        if (!colorSchemeNames.includes(colorName)) {
          acc.push(colorName)
        }

        return acc
      }, colorSchemeNames)
    }
  }

  return colorSchemeNames
}
