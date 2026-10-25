import { clone, mergeWith, walkObject } from "../utils"
import type { SystemConfig } from "./types"

// Token keys that should be moved to DEFAULT when nesting
const tokenKeys = ["value", "type", "description"]

// Check if a value is a valid token
const isValidToken = (token: any): boolean => {
  return token && typeof token === "object" && !Array.isArray(token)
}

const tokenGroups = ["tokens", "semanticTokens"] as const

const hasNestedKeys = (token: any): boolean => {
  return (
    isValidToken(token) &&
    Object.keys(token).some((k) => !tokenKeys.includes(k))
  )
}

// When `other` (the config being merged with) nests a token, move this side's
// token properties to DEFAULT too, so both land in one place and the later wins
const normalizeNestedTokens = (
  target: Record<string, any>,
  other?: Record<string, any>,
) => {
  walkObject(
    target,
    (value, path) => {
      const keys = Object.keys(value)
      const nestedKeys = keys.filter((k) => !tokenKeys.includes(k))
      const hasNested =
        nestedKeys.length > 0 ||
        hasNestedKeys(path.reduce((obj, key) => obj?.[key], other))
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
  const merged: SystemConfig = {}

  for (const config of configs.map(clone)) {
    // Normalize before each merge: afterwards we can't tell which config a value
    // came from, and a later `value` would lose to an earlier `DEFAULT`
    tokenGroups.forEach((group) => {
      const source = config?.theme?.[group]
      const target = merged.theme?.[group]
      if (source) normalizeNestedTokens(source, target)
      if (target) normalizeNestedTokens(target, source)
    })

    mergeWith(merged, config)
  }

  return merged
}
