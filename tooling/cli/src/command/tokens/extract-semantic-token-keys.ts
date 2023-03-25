import { pseudoPropNames } from "./../../../../../packages/core/styled-system/src/pseudos"
import { isObject } from "../../utils/is-object"

const isSemanticTokensExist = (
  theme: Record<string, unknown>,
): theme is Record<"semanticTokens", Record<string, unknown>> =>
  isObject(theme.semanticTokens)

/**
 * Extract Semantic Token keys
 */
export function extractSemanticTokenKeys(
  theme: Record<string, unknown>,
  themePropertyName: string,
) {
  if (!isSemanticTokensExist(theme)) {
    return []
  }

  const themeProperty = theme["semanticTokens"][themePropertyName]

  if (!isObject(themeProperty)) {
    return []
  }

  return Object.keys(flatten(themeProperty))
}

function flatten<Value = any>(
  target: Record<string, Value> | undefined | null,
) {
  if (!isObject(target) && !Array.isArray(target)) {
    return target
  }

  return Object.entries(target).reduce((result, [key, value]) => {
    const isPseudoSelectorKeyExist =
      isObject(value) && pseudoPropNames.some((name) => name in value)

    if (
      (!isPseudoSelectorKeyExist && isObject(value)) ||
      Array.isArray(value)
    ) {
      Object.entries(flatten(value)).forEach(([childKey, childValue]) => {
        // e.g. gray.500
        result[`${key}.${childKey}`] = childValue
      })
    } else {
      // e.g. transparent
      result[key] = value
    }

    return result
  }, {} as any)
}
