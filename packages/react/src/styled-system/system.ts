import { isCssProperty } from "@pandacss/is-valid-prop"
import {
  type Dict,
  compact,
  flatten,
  isObject,
  memo,
  mergeWith,
  splitProps,
} from "../utils"
import { createBreakpoints } from "./breakpoints"
import { createConditions } from "./conditions"
import { mergeConfigs } from "./config"
import { createCssFn } from "./css"
import { createRecipeFn } from "./cva"
import { createLayers } from "./layers"
import { createNormalizeFn } from "./normalize"
import { createPreflight } from "./preflight"
import { createSerializeFn } from "./serialize"
import { createSlotRecipeFn } from "./sva"
import { createTokenDictionary } from "./token-dictionary"
import type {
  SystemConfig,
  SystemContext,
  TokenDictionary,
  TokenFn,
} from "./types"
import { createUtility } from "./utility"

export function createSystem(...configs: SystemConfig[]): SystemContext {
  const config = mergeConfigs(...configs)
  const {
    theme = {},
    utilities = {},
    globalCss = {},
    cssVarsRoot = ":where(:root, :host)",
    cssVarsPrefix = "chakra",
    preflight,
  } = config

  const layers = createLayers(config)

  const tokens = createTokenDictionary({
    breakpoints: theme.breakpoints,
    tokens: theme.tokens,
    semanticTokens: theme.semanticTokens,
    prefix: cssVarsPrefix,
  })

  const breakpoints = createBreakpoints(theme.breakpoints ?? {})

  const conditions = createConditions({
    conditions: config.conditions ?? {},
    breakpoints,
  })

  const utility = createUtility({
    config: utilities,
    tokens,
  })

  function assignComposition() {
    const { textStyles, layerStyles, animationStyles } = theme

    const compositions = compact({
      textStyle: textStyles,
      layerStyle: layerStyles,
      animationStyle: animationStyles,
    })

    for (const [key, values] of Object.entries(compositions)) {
      const flatValues = flatten(
        values ?? {},
        (v) => isObject(v) && "value" in v,
      )

      utility.register(key, {
        values: Object.keys(flatValues),
        transform(value) {
          return css(flatValues[value])
        },
      })
    }
  }

  assignComposition()
  utility.addPropertyType("animationName", Object.keys(theme.keyframes ?? {}))

  const properties = new Set(["css", ...utility.keys(), ...conditions.keys()])

  const isValidProperty = memo(
    (prop: string) => properties.has(prop) || isCssProperty(prop),
  )

  const normalizeValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.reduce((acc, current, index) => {
        const key = conditions.breakpoints[index]
        if (current != null) acc[key] = current
        return acc
      }, {})
    }
    return value
  }

  const normalizeFn = createNormalizeFn({
    utility,
    normalize: normalizeValue,
  })

  const serialize = createSerializeFn({
    conditions,
    isValidProperty,
  })

  const css = createCssFn({
    transform: utility.transform,
    conditions,
    normalize: normalizeFn,
  })

  const cva = createRecipeFn({
    css: css as any,
    conditions,
    normalize: normalizeFn,
    layers,
  })

  const sva = createSlotRecipeFn({ cva })

  function getTokenCss() {
    const result: Dict = {}

    for (const [key, values] of tokens.cssVarMap.entries()) {
      const varsObj = Object.fromEntries(values) as any
      if (Object.keys(varsObj).length === 0) continue
      const selector = key === "base" ? cssVarsRoot : conditions.resolve(key)
      const cssObject = css(serialize({ [selector]: varsObj }))
      mergeWith(result, cssObject)
    }

    return layers.wrap("tokens", result)
  }

  function getGlobalCss() {
    const keyframes = Object.fromEntries(
      Object.entries(theme.keyframes ?? {}).map(([key, value]) => [
        `@keyframes ${key}`,
        value,
      ]),
    )
    const result = Object.assign({}, keyframes, css(serialize(globalCss)))
    return layers.wrap("base", result)
  }

  function splitCssProps(props: any) {
    return splitProps(props, isValidProperty as any)
  }

  function getPreflightCss() {
    const result = createPreflight({ preflight })
    return layers.wrap("reset", result)
  }

  const tokenMap = getTokenMap(tokens)

  const tokenFn: TokenFn = (path: string, fallback?: any) => {
    return tokenMap.get(path)?.value || fallback
  }

  tokenFn.var = (path: string, fallback?: any) => {
    return tokenMap.get(path)?.variable || fallback
  }

  function getRecipe(key: string, fallback?: any) {
    return theme.recipes?.[key] ?? fallback
  }

  function getSlotRecipe(key: string, fallback?: any) {
    return theme.slotRecipes?.[key] ?? fallback
  }

  function isRecipe(key: string) {
    return Object.hasOwnProperty.call(theme.recipes ?? {}, key)
  }

  function isSlotRecipe(key: string) {
    return Object.hasOwnProperty.call(theme.slotRecipes ?? {}, key)
  }

  function hasRecipe(key: string) {
    return isRecipe(key) || isSlotRecipe(key)
  }

  const _global = [getPreflightCss(), getGlobalCss(), getTokenCss()]

  return {
    $$chakra: true,
    _config: config,
    _global,
    breakpoints,
    tokens,
    conditions,
    utility,
    token: tokenFn,
    properties,
    layers,
    isValidProperty,
    splitCssProps: splitCssProps as any,
    normalizeValue,
    getTokenCss,
    getGlobalCss,
    getPreflightCss,
    css: css as any,
    cva,
    sva,
    getRecipe,
    getSlotRecipe,
    hasRecipe,
    isRecipe,
    isSlotRecipe,
  }
}

function getTokenMap(tokens: TokenDictionary) {
  const map = new Map<string, { value: string; variable: string }>()

  tokens.allTokens.forEach((token) => {
    const { cssVar, virtual, conditions } = token.extensions
    const value = !!conditions || virtual ? cssVar!.ref : token.value
    map.set(token.name, { value, variable: cssVar!.ref })
  })

  return map
}

export const isValidSystem = (mod: unknown): mod is SystemContext => {
  return isObject(mod) && !!Reflect.get(mod, "$$chakra")
}
