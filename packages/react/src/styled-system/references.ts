import { isString } from "../utils"
import type { Token } from "./types"

const REFERENCE_REGEX = /({([^}]*)})/g
const CURLY_REGEX = /[{}]/g
export const TOKEN_PATH_REGEX = /\w+\.\w+/

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
