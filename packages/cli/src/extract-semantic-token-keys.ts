import { isObject } from "./utils/is-object.js"

const hasSemanticTokens = (
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
  if (!hasSemanticTokens(theme)) {
    return []
  }

  const themeProperty = theme["semanticTokens"][themePropertyName]

  if (!isObject(themeProperty)) {
    return []
  }

  return Object.keys(flattenSemanticTokens(themeProperty))
}

/**
 * TODO: This is a temporary solution to flatten semantic tokens.
 * We should use the same flatten function as in `packages/core/styled-system/src/create-theme-vars/flatten-tokens.ts`
 */
function flattenSemanticTokens<Value = any>(
  target: Record<string, Value> | undefined | null,
) {
  if (!isObject(target) && !Array.isArray(target)) {
    return target
  }

  return Object.entries(target).reduce((result, [key, value]) => {
    if ((isObject(value) && !("default" in value)) || Array.isArray(value)) {
      Object.entries(flattenSemanticTokens(value)).forEach(
        ([childKey, childValue]) => {
          // e.g. gray.500
          result[`${key}.${childKey}`] = childValue
        },
      )
    } else {
      // e.g. transparent
      result[key] = value
    }

    return result
  }, {} as any)
}
