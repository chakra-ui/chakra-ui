import { Dict, isObject, pick } from "@chakra-ui/utils"
import type { CSSMap, WithCSSVar } from "./types"

const separator = ">"

const replace = (value: string, str = ".") => value.replace(/>/g, str)

export const toVar = (value: string) => `var(${value})`

export const tokens = [
  "colors",
  "borders",
  "borderWidths",
  "borderStyles",
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "radii",
  "space",
  "shadows",
  "sizes",
  "zIndices",
  "transitions",
  "transition.duration",
  "transition.property",
  "transition.easing",
] as const

export type Token = typeof tokens[number]

const extractTokens = (theme: Dict) => {
  const _tokens = (tokens as unknown) as string[]
  return pick(theme, _tokens)
}

export function toCSSVariables<T extends Dict>(theme: T) {
  /**
   * The extracted css variables will be stored here, and used in
   * the emotion's <Global/> component to attach variables to `:root`
   */
  const cssVars: Dict = {}
  /**
   * This is more like a dictionary of tokens users will type `green.500`,
   * and their equivalent css variable.
   */
  const cssMap: CSSMap = {}

  // omit components and breakpoints from css variable map
  const tokens = extractTokens(theme)

  const toProperties = (object: Dict, prevKey?: string) => {
    Object.entries(object).forEach(([key, value]) => {
      const formattedKey = key
      const newKey = prevKey ? prevKey + separator + formattedKey : formattedKey

      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          const _key = newKey + separator + i
          const varKey = `--${replace(_key, "-")}`
          const mapKey = replace(_key, ".")
          cssVars[varKey] = item
          cssMap[mapKey] = { var: varKey, value: item, varRef: toVar(varKey) }
        })
      } else if (isObject(value)) {
        toProperties(value, newKey)
      } else {
        const varKey = `--${replace(newKey, "-")}`
        const mapKey = replace(newKey, ".")
        cssVars[varKey] = value
        cssMap[mapKey] = { var: varKey, value, varRef: toVar(varKey) }
      }
    })
  }

  toProperties(tokens)

  Object.assign(theme, {
    __cssVars: cssVars,
    __cssMap: cssMap,
  })

  console.log(cssVars)

  return theme as WithCSSVar<T>
}
