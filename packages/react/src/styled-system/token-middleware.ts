import { isString } from "../utils"
import { calc } from "./calc"
import type { Token, TokenMiddleware } from "./types"
import { toPx } from "./unit-conversion"

export const addNegativeTokens: TokenMiddleware = {
  enforce: "pre",
  transform(dictionary) {
    const { prefix, allTokens, formatCssVar, formatTokenName, registerToken } =
      dictionary

    const tokens = allTokens.filter(
      ({ extensions }) => extensions.category === "spacing",
    )

    tokens.forEach((token) => {
      const originalPath = token.path.slice()
      const originalVar = formatCssVar(originalPath, prefix)

      if (isString(token.value) && token.value === "0rem") {
        return
      }

      const nextToken = structuredClone(token)

      Object.assign(nextToken.extensions, {
        negative: true,
        prop: `-${token.extensions.prop}`,
        originalPath,
      })

      nextToken.value = calc.negate(originalVar.ref)

      const lastPath = nextToken.path[nextToken.path.length - 1]

      if (lastPath != null) {
        nextToken.path[nextToken.path.length - 1] = `-${lastPath}`
      }

      if (nextToken.path) {
        nextToken.name = formatTokenName(nextToken.path)
      }

      registerToken(nextToken)
    })
  },
}

const units = new Set([
  "spacing",
  "sizes",
  "borderWidths",
  "fontSizes",
  "radii",
])

export const addPixelUnit: TokenMiddleware = {
  enforce: "post",
  transform(dictionary) {
    const tokens = dictionary.allTokens.filter((token) => {
      return units.has(token.extensions.category!) && !token.extensions.negative
    })

    tokens.forEach((token) => {
      Object.assign(token.extensions, {
        pixelValue: toPx(token.value),
      })
    })
  },
}

export const addVirtualPalette: TokenMiddleware = {
  enforce: "post",
  transform(dictionary) {
    const { allTokens, registerToken, formatTokenName } = dictionary

    const tokens = allTokens.filter(
      ({ extensions }) => extensions.category === "colors",
    )

    const keys = new Map<string, string[]>()
    const colorPalettes = new Map<string, Token[]>()

    tokens.forEach((token) => {
      const { colorPalette } = token.extensions
      if (!colorPalette) return

      colorPalette.keys.forEach((keyPath) => {
        keys.set(formatTokenName(keyPath), keyPath)
      })

      colorPalette.roots.forEach((colorPaletteRoot) => {
        const name = formatTokenName(colorPaletteRoot)

        const colorPaletteList = colorPalettes.get(name) || []
        colorPaletteList.push(token)
        colorPalettes.set(name, colorPaletteList)

        if (token.extensions.default && colorPaletteRoot.length === 1) {
          const keyPath = colorPalette.keys[0]?.filter(Boolean)
          if (!keyPath.length) return

          const path = colorPaletteRoot.concat(keyPath)
          keys.set(formatTokenName(path), [])
        }
      })
    })

    keys.forEach((segments) => {
      const path = ["colors", "colorPalette", ...segments].filter(Boolean)
      const name = formatTokenName(path)
      const prop = formatTokenName(path.slice(1))

      const token: Token = {
        name,
        value: name,
        originalValue: name,
        path,
        extensions: {
          condition: "base",
          originalPath: path,
          category: "colors",
          prop,
          virtual: true,
        },
      }

      registerToken(token, "pre")
    })
  },
}

export const removeEmptyTokens: TokenMiddleware = {
  enforce: "post",
  transform(dictionary) {
    dictionary.allTokens = dictionary.allTokens.filter(
      (token) => token.value !== "",
    )
  },
}

export const tokenMiddlewares = [
  addNegativeTokens,
  addVirtualPalette,
  addPixelUnit,
  removeEmptyTokens,
]
