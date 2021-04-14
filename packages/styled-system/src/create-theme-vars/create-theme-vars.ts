import { Dict, isCssVar, walkObject } from "@chakra-ui/utils"
import { ThemeScale } from "./theme-tokens"
import { calc } from "./calc"
import { cssVar } from "./css-var"

export interface CreateThemeVarsOptions {
  cssVarPrefix?: string
}

export interface ThemeVars {
  cssVars: Dict
  cssMap: Dict
}

export function createThemeVars(target: Dict, options: CreateThemeVarsOptions) {
  const context: ThemeVars = {
    cssMap: {},
    cssVars: {},
  }

  walkObject(target, (value, path) => {
    // firstKey will be e.g. "space"
    const [firstKey] = path

    const handler = tokenHandlerMap[firstKey] ?? tokenHandlerMap.defaultHandler

    const { cssVars, cssMap } = handler(path, value, options)
    Object.assign(context.cssVars, cssVars)
    Object.assign(context.cssMap, cssMap)
  })

  return context
}

type TokenHandler = (
  keys: string[],
  value: unknown,
  options: CreateThemeVarsOptions,
) => ThemeVars

/**
 * Define transformation handlers for ThemeScale
 */
const tokenHandlerMap: Partial<Record<ThemeScale, TokenHandler>> & {
  defaultHandler: TokenHandler
} = {
  space: (keys, value, options) => {
    const properties = tokenHandlerMap.defaultHandler(keys, value, options)
    const [firstKey, ...referenceKeys] = keys

    const negativeLookupKey = `${firstKey}.-${referenceKeys.join(".")}`
    const negativeVarKey = keys.join("-")
    const { variable, reference } = cssVar(
      negativeVarKey,
      undefined, // TODO should we add a fallback value?
      options.cssVarPrefix,
    )
    const negativeValue = isCssVar(String(value))
      ? calc.negate(String(value)).toString()
      : `-${value}`

    const varRef = calc.negate(reference).toString()

    return {
      cssVars: properties.cssVars,
      cssMap: {
        ...properties.cssMap,
        [negativeLookupKey]: {
          value: negativeValue,
          var: variable,
          varRef,
        },
      },
    }
  },
  defaultHandler: (keys, value, options) => {
    const lookupKey = keys.join(".")
    const varKey = keys.join("-")

    const { variable, reference } = cssVar(
      varKey,
      undefined, // TODO should we add a fallback value?
      options.cssVarPrefix,
    )

    return {
      cssVars: {
        [variable]: value,
      },
      cssMap: {
        [lookupKey]: {
          value,
          var: variable,
          varRef: reference,
        },
      },
    }
  },
}
