import { flatten } from "@chakra-ui/utils"
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
  return Object.fromEntries([
    ...Object.entries(flatten(tokens) ?? {}).map(([token, value]) => {
      const enhancedToken = { isSemantic: false, value }
      return [token, enhancedToken]
    }),
    ...Object.entries(flatten(semanticTokens, 1) ?? {}).map(
      ([token, value]) => {
        const enhancedToken = { isSemantic: true, value }
        return [token, enhancedToken]
      },
    ),
  ]) as FlatTokens
}
