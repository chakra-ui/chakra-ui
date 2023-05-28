import { walkObject } from "@chakra-ui/object-utils"
import { pseudoPropNames } from "../pseudos"
import { Union } from "../utils"

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

const isSemanticCondition = (key: string) =>
  pseudoPropNames.includes(key as any) || "default" === key

export function flattenTokens<T extends FlattenTokensParam>({
  tokens,
  semanticTokens,
}: T) {
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
