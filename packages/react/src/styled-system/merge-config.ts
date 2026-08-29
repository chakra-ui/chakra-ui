import { clone, mergeWith, walkObject } from "../utils"
import type { SystemConfig } from "./types"

const tokenKeys = ["value", "type", "description"]

const isValidToken = (token: any): boolean => {
  return token && typeof token === "object" && !Array.isArray(token)
}

export const mergeConfigs = (...configs: SystemConfig[]): SystemConfig => {
  const merged = mergeWith({}, ...configs.map(clone))

  if (merged.theme?.tokens) {
    walkObject(
      merged.theme.tokens,
      (value) => {
        const keys = Object.keys(value)
        const nestedKeys = keys.filter((k) => !tokenKeys.includes(k))
        const hasNested = nestedKeys.length > 0
        const hasTokenProps = tokenKeys.some((k) => value[k] != null)

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
        stop(value: any) {
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
