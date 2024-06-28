import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"
import { capitalize, unionType } from "./shared.js"

export async function generateTokens(sys: SystemContext) {
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

  return pretty(Array.from(set).join("\n\n"))
}
