import { Dict, isCssVar, isObject, pick } from "@chakra-ui/utils"
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

const getKeys = (key: string) => ({
  varKey: `--${replace(key, "-")}`,
  mapKey: replace(key, "."),
  negVarKey: `--${key.replace(">-", "-")}`,
})

interface AssignOptions {
  cssVars: Dict
  cssMap: CSSMap
  key: any
  value: any
  negate?: boolean
}

function assign(options: AssignOptions) {
  const { cssVars, cssMap, key, value, negate: minus } = options

  const _value = minus ? negate(value) : value
  const { varKey, mapKey, negVarKey } = getKeys(key)

  if (!minus) {
    cssVars[varKey] = _value
  }

  const _varKey = minus ? negVarKey : varKey
  const minusVal = isCssVar(value)
    ? `calc(${value} * -1)`
    : `calc(${toVar(_varKey)} * -1)`

  const varRef = minus ? minusVal : toVar(varKey)
  cssMap[mapKey] = {
    var: _varKey,
    value: isCssVar(value) ? value : _value,
    varRef,
  }
}

const negate = (value?: string) => {
  if (!value) return
  const num = parseFloat(value)
  const unit = String(value).replace(String(num), "")
  return `-${num}${unit}`
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
      value = Array.isArray(value) ? Object.assign({}, value) : value
      const newKey = prevKey ? prevKey + separator + key : key

      let negKey: string | number | undefined
      if (newKey.startsWith("space")) {
        negKey = typeof key === "string" ? `-${key}` : -key
        if (!Number.isNaN(negKey) && prevKey) {
          negKey = prevKey + separator + negKey
        }
      }

      if (isObject(value)) {
        toProperties(value, newKey)
        return
      }

      assign({ cssMap, cssVars, key: newKey, value })

      if (negKey) {
        assign({ cssMap, cssVars, key: negKey, value, negate: true })
      }
    })
  }

  toProperties(tokens)

  Object.assign(theme, {
    __cssVars: cssVars,
    __cssMap: cssMap,
  })

  return theme as WithCSSVar<T>
}
