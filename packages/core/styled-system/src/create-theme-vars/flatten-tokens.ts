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
    ([token, value]) =>
      [token, { isSemantic: false, value }] as [string, PlainToken],
  )

  const semanticTokenEntries = Object.entries(
    flattenSemanticTokens(semanticTokens) ?? {},
  ).map(
    ([token, value]) =>
      [token, { isSemantic: true, value }] as [string, SemanticToken],
  )

  return Object.fromEntries([
    ...tokenEntries,
    ...semanticTokenEntries,
  ]) as FlatTokens
}

function flatten<Value = any>(obj: Record<string, Value> | undefined | null) {
  if (!isObject(obj) && !Array.isArray(obj)) {
    return obj
  }

  return Object.entries(obj).reduce((result, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      Object.entries(flatten(value)).forEach(([childKey, childValue]) => {
        result[`${key}.${childKey}`] = childValue
      })
    } else {
      result[key] = value
    }
    return result
  }, {} as any)
}

function flattenSemanticTokens<Value = any>(
  obj: Record<string, Value> | undefined | null,
) {
  if (!isObject(obj) && !Array.isArray(obj)) {
    return obj
  }

  return Object.entries(obj).reduce((result, [key, value]) => {
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
