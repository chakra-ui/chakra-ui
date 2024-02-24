import { walkObject } from "@chakra-ui/utils/walk-object"
import { getPseudoPropNames } from "../pseudos"
import { Union } from "../utils"
import { extractSemanticTokens, extractTokens } from "./theme-tokens"

export type SemanticValue<
  Conditions extends string,
  Token extends string = string,
> = Union<Token> | Partial<Record<"default" | Conditions, Union<Token>>>

export type PlainToken = {
  isSemantic: false
  value: string | number
}

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

export function flattenTokens(theme: Record<string, any>) {
  const tokens = extractTokens(theme)
  const semanticTokens = extractSemanticTokens(theme)

  const pseudoPropNames = getPseudoPropNames(theme)
  const isSemanticCondition = (key: string) =>
    pseudoPropNames.includes(key) || "default" === key

  const result: FlatTokens = {}

  walkObject(tokens, (value, path) => {
    if (value == null) return
    result[path.join(".")] = { isSemantic: false, value }
  })

  walkObject(
    semanticTokens,
    (value, path) => {
      if (value == null) return
      result[path.join(".")] = { isSemantic: true, value }
    },
    {
      stop: (value) => Object.keys(value).every(isSemanticCondition),
    },
  )

  return result
}
