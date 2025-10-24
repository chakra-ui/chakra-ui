import { isCssProperty } from "@pandacss/is-valid-prop"
import {
  type Dict,
  compact,
  flatten,
  isObject,
  mapEntries,
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
import { EMPTY_OBJECT, createEmptyObject } from "./singleton"
import { createSlotRecipeFn } from "./sva"
import { createTokenDictionary } from "./token-dictionary"
import type {
  SystemConfig,
  SystemContext,
  SystemQuery,
  Token,
  TokenCategory,
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

  const breakpoints = createBreakpoints(theme.breakpoints ?? EMPTY_OBJECT)

  const conditions = createConditions({
    conditions: config.conditions ?? EMPTY_OBJECT,
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
      const flatValues = flatten(values ?? EMPTY_OBJECT, stop)

      utility.register(key, {
        values: Object.keys(flatValues),
        transform(value) {
          return css(flatValues[value])
        },
      })
    }
  }

  assignComposition()
  utility.addPropertyType(
    "animationName",
    Object.keys(theme.keyframes ?? EMPTY_OBJECT),
  )

  const properties = new Set(["css", ...utility.keys(), ...conditions.keys()])

  const isValidProperty = memo(
    (prop: string) => properties.has(prop) || isCssProperty(prop),
  )

  const normalizeValue = (value: any): any => {
    if (Array.isArray(value)) {
      const result = createEmptyObject()
      for (let index = 0; index < value.length; index++) {
        const current = value[index]
        if (current != null) {
          const key = conditions.breakpoints[index]
          result[key] = current
        }
      }
      return result
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
      const isAtRule = selector.startsWith("@")
      const cssObject = css(
        serialize({
          [selector]: isAtRule ? { [cssVarsRoot]: varsObj } : varsObj,
        }),
      )
      mergeWith(result, cssObject)
    }

    return layers.wrap("tokens", result)
  }

  function getGlobalCss() {
    const keyframes = mapEntries(
      theme.keyframes ?? EMPTY_OBJECT,
      (key, value) => [`@keyframes ${key}`, value],
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
    return Object.hasOwnProperty.call(theme.recipes ?? EMPTY_OBJECT, key)
  }

  function isSlotRecipe(key: string) {
    return Object.hasOwnProperty.call(theme.slotRecipes ?? EMPTY_OBJECT, key)
  }

  function hasRecipe(key: string) {
    return isRecipe(key) || isSlotRecipe(key)
  }

  const _global = [getPreflightCss(), getGlobalCss(), getTokenCss()]

  const query: SystemQuery = {
    layerStyles: compositionQuery(theme.layerStyles ?? EMPTY_OBJECT),
    textStyles: compositionQuery(theme.textStyles ?? EMPTY_OBJECT),
    animationStyles: compositionQuery(theme.animationStyles ?? EMPTY_OBJECT),
    tokens: semanticTokenQuery(
      tokens,
      Object.keys(theme.tokens ?? EMPTY_OBJECT),
      (value, key) =>
        !value.extensions.conditions && !key.includes("colorPalette"),
    ),
    semanticTokens: semanticTokenQuery(
      tokens,
      Object.keys(theme.semanticTokens ?? EMPTY_OBJECT),
      (value) => !!value.extensions.conditions,
    ),
    keyframes: basicQuery(theme.keyframes ?? EMPTY_OBJECT),
    breakpoints: basicQuery(theme.breakpoints ?? EMPTY_OBJECT),
  }

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
    query,
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

const stop = (v: any) => isObject(v) && "value" in v

const compositionQuery = (dict: Record<string, any>) => ({
  list() {
    return Object.keys(flatten(dict, stop))
  },
  search(query: string) {
    return this.list().filter((style) => style.includes(query))
  },
})

const semanticTokenQuery = (
  tokens: TokenDictionary,
  categoryKeys: string[],
  predicate: (value: Token<any>, key: string) => boolean,
) => ({
  categoryKeys,
  list(category: TokenCategory) {
    const map = tokens.categoryMap.get(category)
    const entries = map ? [...map.entries()] : []
    const result: string[] = []

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i]
      if (predicate(value, key)) {
        result.push(key)
      }
    }

    return result
  },
  search(category: TokenCategory, query: string) {
    return this.list(category).filter((style) => style.includes(query))
  },
})

const basicQuery = (dict: Record<string, any>) => ({
  list() {
    return Object.keys(dict)
  },
  search(query: string) {
    return this.list().filter((style) => style.includes(query))
  },
})
