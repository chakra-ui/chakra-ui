import { isObject } from "@chakra-ui/shared-utils"
import { Union } from "../utils"

export type SemanticValue<
  Conditions extends string,
  Token extends string = string,
> = Union<Token> | Partial<Record<"default" | Conditions, Union<Token>>>

export type PlainToken = { isSemantic: false; value: string | number }
export type SemanticToken = {
  isSemantic: true
  value: string | number | SemanticValue<string>
}

export type FlatToken = PlainToken | SemanticToken
export type FlatTokens = Record<string, FlatToken>

export type FlattenTokensParam = {
  tokens?: object
  semanticTokens?: object
}

export function flattenTokens<T extends FlattenTokensParam>({
  tokens,
  semanticTokens,
}: T) {
  const tokenEntries = Object.entries(flatten(tokens) ?? {}).map(
    ([token, value]) => {
      const enhancedToken = { isSemantic: false, value }
      return [token, enhancedToken] as [string, PlainToken]
    },
  )
  const semanticTokenEntries = Object.entries(
    flatten(semanticTokens, 1) ?? {},
  ).map(([token, value]) => {
    const enhancedToken = { isSemantic: true, value }
    return [token, enhancedToken] as [string, SemanticToken]
  })

  return Object.fromEntries([
    ...tokenEntries,
    ...semanticTokenEntries,
  ]) as FlatTokens
}

export function flatten<Value = any>(
  target: Record<string, Value> | undefined | null,
  maxDepth = Infinity,
) {
  if ((!isObject(target) && !Array.isArray(target)) || !maxDepth) {
    return target
  }

  return Object.entries(target).reduce((result, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      Object.entries(flatten(value, maxDepth - 1)).forEach(
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
