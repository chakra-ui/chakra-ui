import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"
import { capitalize, unionType } from "./shared.js"

export function generateTokensResult(sys: SystemContext) {
  const { allTokens, tokenMap, colorPaletteMap, categoryMap } = sys.tokens

  const isTokenEmpty = allTokens.length === 0

  const set = new Set<string>()

  set.add(
    `export type Token = ${
      isTokenEmpty ? "string" : unionType(Array.from(tokenMap.keys()))
    }`,
  )

  const result = new Set<string>(["export type Tokens = {"])

  if (isTokenEmpty) {
    result.add("[token: string]: string")
  } else {
    const colorPaletteKeys = Array.from(colorPaletteMap.keys())

    if (colorPaletteKeys.length) {
      set.add(`export type ColorPalette = ${unionType(colorPaletteKeys)}`)
    }

    for (const [key, value] of categoryMap.entries()) {
      const typeName = capitalize(key)
      set.add(`export type ${typeName}Token = ${unionType(value.keys())}`)
      result.add(`\t\t${key}: ${typeName}Token`)
    }
  }

  result.add("} & { [token: string]: never }")

  set.add(Array.from(result).join("\n"))

  return Array.from(set).join("\n\n")
}

/**
 * Generates token types for module augmentation.
 * Only emits the Tokens interface (which TypeScript can merge).
 * Skips Token union, ColorPalette, and category token type aliases.
 */
export function generateTokensResultForAugmentation(sys: SystemContext) {
  const { allTokens, categoryMap } = sys.tokens

  const isTokenEmpty = allTokens.length === 0

  const result = new Set<string>(["export interface Tokens {"])

  if (isTokenEmpty) {
    result.add("[token: string]: string")
  } else {
    for (const [key, value] of categoryMap.entries()) {
      result.add(`\t\t${key}: ${unionType(value.keys())}`)
    }
  }

  result.add("}")

  return Array.from(result).join("\n")
}

export async function generateTokens(sys: SystemContext) {
  return pretty(generateTokensResult(sys))
}
