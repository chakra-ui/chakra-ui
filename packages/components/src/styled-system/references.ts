import { isString } from "@chakra-ui/utils"
import { Token } from "./types"

const REFERENCE_REGEX = /({([^}]*)})/g
const CURLY_REGEX = /[{}]/g
const TOKEN_FN_REGEX = /token\(([^)]+)\)/g
const CLOSING_REGEX = /\)$/g

export const getReferences = (value: string) => {
  if (!isString(value)) return []

  const matches = value.match(REFERENCE_REGEX)
  if (!matches) return []

  return matches
    .map((match) => match.replace(CURLY_REGEX, ""))
    .map((value) => value.trim())
}

export const hasReference = (value: string) => REFERENCE_REGEX.test(value)

export function expandReferences(token: Token) {
  if (!token.extensions?.references) {
    return token.extensions?.cssVar?.ref ?? token.value
  }

  const references = token.extensions.references ?? {}

  token.value = Object.keys(references).reduce((valueStr, key) => {
    const referenceToken = references[key]

    // If a conditional token is referenced, we'll keep the reference
    if (referenceToken.extensions.conditions) {
      return valueStr
    }

    const value = expandReferences(referenceToken)

    return valueStr.replace(`{${key}}`, value)
  }, token.value)

  delete token.extensions.references

  return token.value
}

const isTokenReference = (v: string) =>
  REFERENCE_REGEX.test(v) || TOKEN_FN_REGEX.test(v)

const tokenReplacer = (a: string, b?: string) =>
  b
    ? a.endsWith(")")
      ? a.replace(CLOSING_REGEX, `, ${b})`)
      : `var(${a}, ${b})`
    : a

export function transformReferences(
  v: string,
  fn: (v: string) => string | undefined,
) {
  if (!isTokenReference(v)) return v

  const references = getReferences(v)

  const value = references.reduce((valueStr, key) => {
    const resolved = fn(key)
    const expandedValue = resolved ?? `var(--${key})`
    return valueStr.replace(`{${key}}`, expandedValue)
  }, v)

  if (!value.includes(`token(`)) return value

  return value.replace(TOKEN_FN_REGEX, (_, token) => {
    const [tokenValue, tokenFallback] = token
      .split(",")
      .map((s: string) => s.trim())

    const result = [tokenValue, tokenFallback]
      .filter(Boolean)
      .map((key) => fn(key) ?? `var(--${key})`)

    if (result.length > 1) {
      const [a, b] = result
      return tokenReplacer(a, b)
    }

    return tokenReplacer(result[0])
  })
}
