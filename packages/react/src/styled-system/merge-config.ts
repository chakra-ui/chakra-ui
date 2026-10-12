import { clone, mergeWith, walkObject } from "../utils"
import type { SystemConfig } from "./types"

// Token keys that should be moved to DEFAULT when nesting
const tokenKeys = ["value", "type", "description"]

// Check if a value is a valid token
const isValidToken = (token: any): boolean => {
  return token && typeof token === "object" && !Array.isArray(token)
}

const normalizeNestedTokens = (target: Record<string, any>) => {
  walkObject(
    target,
    (value) => {
      const keys = Object.keys(value)
      const nestedKeys = keys.filter((k) => !tokenKeys.includes(k))
      const hasNested = nestedKeys.length > 0
      const hasTokenProps = tokenKeys.some((k) => value[k] != null)

      // If this token has both token properties and nested tokens,
      // move token properties to DEFAULT
      if (hasNested && hasTokenProps) {
        value.DEFAULT ||= {}
        tokenKeys.forEach((key) => {
          if (value[key] == null) return
          value.DEFAULT[key] ||= value[key]
          delete value[key]
        })
      }

      return value
    },
    {
      stop(value) {
        // Stop traversal only for actual token entries.
        // Mixed-case token names like `whiteAlpha` live at the category level
        // and should not prevent us from reaching sibling tokens like `black`.
        return (
          isValidToken(value) && tokenKeys.some((key) => value[key] != null)
        )
      },
    },
  )
}

export const mergeConfigs = (...configs: SystemConfig[]): SystemConfig => {
  const merged = mergeWith({}, ...configs.map(clone))

  // Normalize tokens to handle nested token structures
  if (merged.theme?.tokens) {
    normalizeNestedTokens(merged.theme.tokens)
  }

  // Semantic tokens are walked with the same `stop` predicate, so they need the
  // same normalization or a nested override hides its sibling tokens.
  if (merged.theme?.semanticTokens) {
    normalizeNestedTokens(merged.theme.semanticTokens)
  }

  return merged
}
