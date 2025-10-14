import { clone, mergeWith, walkObject } from "../utils"
import type { SystemConfig } from "./types"

// Token keys that should be moved to DEFAULT when nesting
const tokenKeys = ["value", "type", "description"]

// Check if a value is a valid token
const isValidToken = (token: any): boolean => {
  return token && typeof token === "object" && !Array.isArray(token)
}

export const mergeConfigs = (...configs: SystemConfig[]): SystemConfig => {
  const merged = mergeWith({}, ...configs.map(clone))

  // Normalize tokens to handle nested token structures
  if (merged.theme?.tokens) {
    walkObject(
      merged.theme.tokens,
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
          // Stop traversal when we encounter a token-like object
          return (
            isValidToken(value) &&
            Object.keys(value).some(
              (k) =>
                tokenKeys.includes(k) ||
                (k !== k.toLowerCase() && k !== k.toUpperCase()),
            )
          )
        },
      },
    )
  }

  return merged
}
