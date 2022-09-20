import { isObject } from "../../utils/is-object"

/**
 * Extract textStyles keys
 */
export function extractPropertyKeys(
  theme: Record<string, unknown>,
  themePropertyName: string,
) {
  const themeProperty = theme[themePropertyName]
  if (!isObject(themeProperty)) {
    return []
  }

  return Object.keys(themeProperty)
}
