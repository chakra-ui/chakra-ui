import {
  Dict,
  compact,
  flatten,
  isObject,
  memo,
  mergeWith,
  splitProps,
} from "@chakra-ui/utils"
import { createBreakpoints } from "./breakpoints"
import { createConditions } from "./conditions"
import { createCssFn } from "./css"
import { createRecipeFn } from "./cva"
import { isCssProperty } from "./is-valid-prop"
import { createNormalizeFn } from "./normalize"
import { createPreflight } from "./preflight"
import { createSerializeFn } from "./serialize"
import { createSlotRecipeFn } from "./sva"
import { createTokenDictionary } from "./token-dictionary"
import { SystemConfig, SystemContext, TokenDictionary, TokenFn } from "./types"
import { createUtilty } from "./utility"

export function createSystem(config: SystemConfig): SystemContext {
  const {
    theme = {},
    utilities = {},
    globalCss = {},
    cssVarsRoot = ":where(:root, :host)",
    cssVarsPrefix = "chakra",
    preflight,
  } = config

  const tokens = createTokenDictionary({
    tokens: theme.tokens,
    semanticTokens: theme.semanticTokens,
    prefix: cssVarsPrefix,
  })

  const breakpoints = createBreakpoints(theme.breakpoints ?? {})

  const conditions = createConditions({
    conditions: config.conditions ?? {},
    breakpoints,
  })

  const utility = createUtilty({
    config: utilities,
    tokens,
  })

  function assignComposition() {
    const { textStyles, layerStyles } = theme

    const compositions = compact({
      textStyle: textStyles,
      layerStyle: layerStyles,
    })

    for (const [key, values] of Object.entries(compositions)) {
      const flatValues = flatten(
        values ?? {},
        (v) => isObject(v) && "value" in v,
      )

      utility.register(key, {
        values: Object.keys(flatValues),
        transform(value) {
          return { "@layer compositions": css(flatValues[value]) }
        },
      })
    }
  }

  assignComposition()

  const properties = new Set(["css", ...utility.keys(), ...conditions.keys()])

  const isValidProperty = memo(
    (prop: string) => properties.has(prop) || isCssProperty(prop),
  )

  const normalizeFn = createNormalizeFn({ utility, conditions })
  const serialize = createSerializeFn({ conditions, isValidProperty })

  const css = createCssFn({
    transform: utility.transform,
    conditions,
    normalize: normalizeFn,
  })

  const cva = createRecipeFn({
    css: css as any,
    conditions,
    normalize: normalizeFn,
  })

  const sva = createSlotRecipeFn({ cva })

  function getTokenCss() {
    const result: Dict = {}

    for (const [key, values] of tokens.cssVarMap.entries()) {
      const varsObj = Object.fromEntries(values) as any
      if (Object.keys(varsObj).length === 0) continue

      if (key === "base") {
        const cssObj = css(serialize({ [cssVarsRoot]: varsObj }))
        mergeWith(result, cssObj)
      } else {
        const cssObject = css(serialize({ [key]: varsObj }))
        mergeWith(result, cssObject)
      }
    }

    return result
  }

  function getGlobalCss() {
    const keyframes = Object.fromEntries(
      Object.entries(theme.keyframes ?? {}).map(([key, value]) => [
        `@keyframes ${key}`,
        value,
      ]),
    )
    return Object.assign({}, keyframes, css(serialize(globalCss)))
  }

  function splitCssProps(props: any) {
    return splitProps(props, isValidProperty as any)
  }

  function getPreflightCss() {
    return createPreflight({ preflight })
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

  return {
    $$typeof: "SystemContext",
    _config: config,
    breakpoints,
    tokens,
    conditions,
    utility,
    token: tokenFn,
    properties,
    isValidProperty,
    splitCssProps: splitCssProps as any,
    getTokenCss,
    getGlobalCss,
    getPreflightCss,
    css: css as any,
    cva,
    sva,
    getRecipe,
    getSlotRecipe,
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
