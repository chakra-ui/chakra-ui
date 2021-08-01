import { Dict, walkObject } from "@chakra-ui/utils"
import { ThemeScale } from "./theme-tokens"
import { calc, Operand } from "./calc"
import { cssVar } from "./css-var"

export interface Conditions extends Dict<string> {}

export interface CreateThemeVarsOptions {
  cssVarPrefix?: string
  conditions?: Conditions
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
  value: unknown | { reference: string },
  options: CreateThemeVarsOptions,
) => ThemeVars

/**
 * Define transformation handlers for ThemeScale
 */
const tokenHandlerMap: Partial<
  Record<ThemeScale | "tokensMap", TokenHandler>
> & {
  defaultHandler: TokenHandler
} = {
  space: (keys, value, options) => {
    const properties = tokenHandlerMap.defaultHandler(keys, value, options)
    const [firstKey, ...referenceKeys] = keys

    const negativeLookupKey = `${firstKey}.-${referenceKeys.join(".")}`
    const negativeVarKey = keys.join("-")
    const { variable, reference } = cssVar(
      negativeVarKey,
      undefined,
      options.cssVarPrefix,
    )

    const negativeValue = calc.negate(value as Operand)
    const varRef = calc.negate(reference)

    return {
      cssVars: properties.cssVars,
      cssMap: {
        ...properties.cssMap,
        [negativeLookupKey]: {
          value: `${negativeValue}`,
          var: `${variable}`,
          varRef,
        },
      },
    }
  },
  tokensMap: (keys, value, options) => {
    const [, scale, ...tokenPath] = keys
    const latestKey = tokenPath[tokenPath.length - 1]
    const isConditionToken = Object.keys(options.conditions ?? {}).includes(
      latestKey,
    )

    const varKey = [scale, ...tokenPath].join("-")
    const lookupKey = [scale, ...tokenPath].join(".")

    if (!isConditionToken) {
      const { variable, reference } = cssVar(
        varKey,
        undefined,
        options.cssVarPrefix,
      )

      const cssVars = {
        [variable]: cssVar(
          [scale, ...String(value).split(".")].join("-"),
          undefined,
          options.cssVarPrefix,
        ).reference,
      }

      return {
        cssVars,
        cssMap: {
          [lookupKey]: {
            value,
            variable,
            reference,
          },
        },
      }
    }

    /**
     * @example ["colors", "text"]
     */
    const parentPath = [scale, ...tokenPath.slice(0, -1)]
    const parentVarKey = parentPath.join("-")
    const parentLookupKey = parentPath.join(".")

    const { variable, reference } = cssVar(
      parentVarKey,
      undefined,
      options.cssVarPrefix,
    )

    /**
     * Resolves `_dark` to `[data-theme=dark] &`
     */
    const resolvedCondition = String(
      options.conditions?.[latestKey] ?? latestKey,
    )

    /**
     * Resolves for `scale="colors", value="gray.100"` to `--colors-gray-100`
     */
    const targetCssVar = cssVar(
      [scale, ...String(value).split(".")].join("-"),
      undefined,
      options.cssVarPrefix,
    )

    const cssVarValue = cssVar(
      [...parentPath, "DEFAULT"].join("-"),
      "var(--chakra-empty,/*!*/ /*!*/)",
      options.cssVarPrefix,
    )

    const cssVars = {
      [variable]: cssVarValue.reference,
      [resolvedCondition]: {
        [variable]: targetCssVar.reference,
      },
    }

    return {
      cssVars,
      cssMap: {
        [parentLookupKey]: {
          value: cssVarValue,
          variable,
          reference,
        },
      },
    }
  },
  defaultHandler: (keys, value, options) => {
    const lookupKey = keys.join(".")
    const varKey = keys.join("-")

    const { variable, reference } = cssVar(
      varKey,
      undefined,
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
