import {
  Dict,
  isCssVar,
  isObject,
  pick,
  analyzeBreakpoints,
} from "@chakra-ui/utils"
import type { WithCSSVar } from "./types"

const replaceWhiteSpace = (value: string, replaceValue = "-") =>
  value.replace(/\s+/g, replaceValue)

const escape = (value: string | number) => {
  const valueStr = replaceWhiteSpace(value.toString())
  if (valueStr.includes("\\.")) return value
  const isDecimal = !Number.isInteger(parseFloat(value.toString()))
  return isDecimal ? valueStr.replace(".", `\\.`) : value
}

export const toVarDefinition = (value: string, prefix = "") =>
  `--${[prefix, escape(value)].filter(Boolean).join("-")}`
export const toVarReference = (value: string) => `var(${escape(value)})`
export const toNegativeVar = (value: string) => `calc(${escape(value)} * -1)`

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
  "transition",
] as const

export type ThemeScale =
  | typeof tokens[number]
  | "transition.duration"
  | "transition.property"
  | "transition.easing"

function extractTokens(theme: Dict) {
  const _tokens = (tokens as unknown) as string[]
  return pick(theme, _tokens)
}

function omitVars(rawTheme: Dict) {
  const { __cssMap, __cssVars, __breakpoints, ...cleanTheme } = rawTheme
  return cleanTheme
}

/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
const transformTemplate = [
  "rotate(var(--chakra-rotate, 0))",
  "scaleX(var(--chakra-scale-x, 1))",
  "scaleY(var(--chakra-scale-y, 1))",
  "skewX(var(--chakra-skew-x, 0))",
  "skewY(var(--chakra-skew-y, 0))",
]

export function getTransformTemplate() {
  return [
    "translateX(var(--chakra-translate-x, 0))",
    "translateY(var(--chakra-translate-y, 0))",
    ...transformTemplate,
  ].join(" ")
}

export function getTransformGpuTemplate() {
  return [
    "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)",
    ...transformTemplate,
  ].join(" ")
}

export function toCSSVar<T extends Dict>(rawTheme: T) {
  /**
   * In the case the theme has already been converted to css-var (e.g extending the theme),
   * we can omit the computed css vars and recompute it for the extended theme.
   */
  const theme = omitVars(rawTheme)

  // omit components and breakpoints from css variable map
  const tokens = extractTokens(theme)

  const cssVarPrefix = theme.config?.cssVarPrefix

  const {
    /**
     * This is more like a dictionary of tokens users will type `green.500`,
     * and their equivalent css variable.
     */
    cssMap,
    /**
     * The extracted css variables will be stored here, and used in
     * the emotion's <Global/> component to attach variables to `:root`
     */
    cssVars,
  } = toProperties(tokens, { cssVarPrefix })

  const defaultCssVars: Dict = {
    "--chakra-ring-offset": "0px",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-width": "3px",
    "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
    "--chakra-ring-offset-shadow":
      "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
    "--chakra-ring-shadow":
      "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
    "--chakra-ring":
      "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
    "--chakra-transform-gpu": getTransformGpuTemplate(),
    "--chakra-transform": getTransformTemplate(),
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
  }

  Object.assign(theme, {
    __cssVars: { ...defaultCssVars, ...cssVars },
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme.breakpoints),
  })

  return theme as WithCSSVar<T>
}

type ToPropertiesOptions = { cssVarPrefix?: string }

function toProperties(
  target: Dict,
  options: ToPropertiesOptions,
  initialContext?: { cssMap?: Dict; cssVars?: Dict },
  prefixes: string[] = [],
) {
  const context = {
    cssMap: {
      ...initialContext?.cssMap,
    },
    cssVars: {
      ...initialContext?.cssVars,
    },
  }

  return Object.entries(target).reduce((properties, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      const nested = toProperties(
        value,
        options,
        properties,
        prefixes.concat(key),
      )
      Object.assign(properties.cssVars, nested.cssVars)
      Object.assign(properties.cssMap, nested.cssMap)
    } else {
      const finalKey = prefixes.concat(key)
      // firstKey will be e.g. "space"
      const [firstKey] = finalKey

      const handler =
        tokenHandlerMap[firstKey] ?? tokenHandlerMap.defaultHandler

      const { cssVars, cssMap } = handler(finalKey, value, options)
      Object.assign(properties.cssVars, cssVars)
      Object.assign(properties.cssMap, cssMap)
    }

    return properties
  }, context)
}

/**
 * Define transformation handlers for ThemeScale
 */
const tokenHandlerMap: Partial<
  Record<
    ThemeScale | "defaultHandler",
    (
      keys: string[],
      value: unknown,
      options: ToPropertiesOptions,
    ) => { cssVars: Dict; cssMap: Dict }
  >
> = {
  space: (keys, value, options) => {
    const properties = tokenHandlerMap.defaultHandler!(keys, value, options)
    const [firstKey, ...referenceKeys] = keys

    const negativeLookupKey = `${firstKey}.-${referenceKeys.join(".")}`
    const negativeVarKey = keys.join("-")
    const cssVar = toVarDefinition(negativeVarKey, options.cssVarPrefix)
    const negativeValue = isCssVar(String(value))
      ? toNegativeVar(String(value))
      : `-${value}`

    const varRef = toNegativeVar(toVarReference(cssVar))

    return {
      cssVars: properties.cssVars,
      cssMap: {
        ...properties.cssMap,
        [negativeLookupKey]: {
          value: negativeValue,
          var: cssVar,
          varRef,
        },
      },
    }
  },
  defaultHandler: (keys, value, options) => {
    const lookupKey = keys.join(".")
    const varKey = keys.join("-")

    const cssVar = toVarDefinition(varKey, options.cssVarPrefix)

    return {
      cssVars: {
        [cssVar]: value,
      },
      cssMap: {
        [lookupKey]: {
          value,
          var: cssVar,
          varRef: toVarReference(cssVar),
        },
      },
    }
  },
}
