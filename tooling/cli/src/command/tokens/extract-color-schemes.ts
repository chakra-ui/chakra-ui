import { isColorHue } from "../../utils/is-color-hue"
import { isObject } from "../../utils/is-object"
import { extractPropertyPaths } from "./extract-property-paths"
import {
  extractSemanticTokenKeys,
  flattenSemanticTokens,
} from "./extract-semantic-token-keys"

/**
 * Extract color scheme names
 * by validating that every property of type ColorHue is in the object
 */
export function extractColorSchemeTypes(
  theme: Record<string, unknown>,
  allowSemanticTokenColorsInColorSchemes: boolean,
) {
  const { colors } = theme
  const colorSchemeNames: string[] = []

  if (isObject(colors)) {
    Object.entries(colors).reduce((acc: string[], [colorName, colorValues]) => {
      if (isColorHue(colorValues)) {
        acc.push(colorName)
      }

      return acc
    }, colorSchemeNames)
  }

  if (allowSemanticTokenColorsInColorSchemes) {
    colorSchemeNames.push(...extractSemanticTokenKeys(theme, "colors"))
  }

  return colorSchemeNames
}
