import {
  type Dict,
  compact,
  createProps,
  isFunction,
  isObject,
  isString,
  mapObject,
  memo,
  walkObject,
} from "../utils"
import { cssVar } from "./css-var"
import { esc } from "./esc"
import { expandTokenReferences as _expandReferences } from "./expand-reference"
import { mapToJson } from "./map-to-json"
import {
  TOKEN_PATH_REGEX,
  expandReferences,
  getReferences,
  hasReference,
} from "./references"
import { tokenMiddlewares } from "./token-middleware"
import { tokenTransforms } from "./token-transforms"
import type {
  SemanticTokenDefinition,
  Token,
  TokenCategory,
  TokenDefinition,
  TokenDictionary,
  TokenEnforcePhase,
  TokenMiddleware,
  TokenTransformer,
} from "./types"

interface Options {
  prefix?: string
  breakpoints?: Record<string, string>
  tokens?: TokenDefinition
  semanticTokens?: SemanticTokenDefinition
}

const isToken = (value: any) => {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, "value")
}

function expandBreakpoints(breakpoints?: Record<string, string>) {
  if (!breakpoints) return { breakpoints: {}, sizes: {} }
  return {
    breakpoints: mapObject(breakpoints, (value) => ({ value })),
    sizes: Object.fromEntries(
      Object.entries(breakpoints).map(([key, value]) => [
        `breakpoint-${key}`,
        { value },
      ]),
    ),
  }
}

export function createTokenDictionary(options: Options): TokenDictionary {
  const {
    prefix = "",
    tokens = {},
    semanticTokens = {},
    breakpoints = {},
  } = options

  const formatTokenName = (path: string[]) => path.join(".")

  const formatCssVar = (path: string[], prefix: string) =>
    cssVar(path.join("-"), { prefix })

  const allTokens: Token[] = []
  const tokenNameMap: Map<string, Token> = new Map()
  const conditionMap = new Map<string, Set<Token>>()
  const cssVarMap = new Map<string, Map<string, string>>()
  const colorPaletteMap = new Map<string, Map<string, string>>()
  const flatMap = new Map<string, string>()
  const byCategory = new Map<string, Map<string, string>>()
  const categoryMap = new Map<string, Map<string, Token>>()

  const transforms: Map<string, TokenTransformer> = new Map()
  const middlewares: TokenMiddleware[] = []

  function registerToken(token: Token, phase?: TokenEnforcePhase) {
    allTokens.push(token)
    tokenNameMap.set(token.name, token)

    if (phase) {
      transforms.forEach((fn) => {
        if (fn.enforce === phase) transformToken(fn, token)
      })
    }
  }

  const breakpointTokens = expandBreakpoints(breakpoints)

  const computedTokens = compact({
    ...tokens,
    breakpoints: breakpointTokens.breakpoints,
    sizes: {
      ...tokens.sizes,
      ...breakpointTokens.sizes,
    },
  })

  function registerTokens() {
    walkObject(
      computedTokens,
      (entry, path) => {
        const isDefault = path.includes("DEFAULT")
        path = filterDefault(path)

        const category = path[0]
        const name = formatTokenName(path)

        const t = isString(entry) ? { value: entry } : entry

        const token: Token = {
          value: t.value,
          originalValue: t.value,
          name,
          path,
          extensions: {
            condition: "base",
            originalPath: path,
            category,
            prop: formatTokenName(path.slice(1)),
          },
        }

        if (isDefault) {
          token.extensions.default = true
        }

        registerToken(token)
      },
      { stop: isToken },
    )

    walkObject(
      semanticTokens,
      (entry, path) => {
        const isDefault = path.includes("DEFAULT")
        path = filterBaseCondition(filterDefault(path))

        const category = path[0]

        const name = formatTokenName(path)
        const t = isString(entry.value)
          ? { value: { base: entry.value } }
          : entry

        const token: Token = {
          value: t.value.base || "",
          originalValue: t.value.base || "",
          name,
          path,
          extensions: {
            originalPath: path,
            category,
            conditions: t.value,
            condition: "base",
            prop: formatTokenName(path.slice(1)),
          },
        }

        if (isDefault) {
          token.extensions.default = true
        }

        registerToken(token)
      },
      { stop: isToken },
    )
  }

  function getByName(name: string) {
    return tokenNameMap.get(name)
  }

  function buildConditionMap(token: Token) {
    const { condition } = token.extensions
    if (!condition) return

    if (!conditionMap.has(condition)) {
      conditionMap.set(condition, new Set<Token>())
    }

    conditionMap.get(condition)!.add(token)
  }

  function buildCategoryMap(token: Token) {
    const { category, prop } = token.extensions
    if (!category) return

    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Map())
    }

    categoryMap.get(category)!.set(prop, token)
  }

  function buildCssVars(token: Token) {
    const { condition, negative, virtual, cssVar } = token.extensions
    if (negative || virtual || !condition || !cssVar) return

    if (!cssVarMap.has(condition)) {
      cssVarMap.set(condition, new Map())
    }

    cssVarMap.get(condition)!.set(cssVar.var, token.value)
  }

  function buildFlatMap(token: Token) {
    const { category, prop, cssVar, negative } = token.extensions
    if (!category) return

    if (!byCategory.has(category)) {
      byCategory.set(category, new Map())
    }

    const value = negative
      ? token.extensions.conditions
        ? token.originalValue
        : token.value
      : cssVar!.ref

    byCategory.get(category)!.set(prop, value)
    flatMap.set([category, prop].join("."), value)
  }

  function buildColorPalette(token: Token) {
    const { colorPalette, virtual, default: isDefault } = token.extensions
    if (!colorPalette || virtual) return

    colorPalette.roots.forEach((root) => {
      const name = formatTokenName(root)

      if (!colorPaletteMap.has(name)) {
        colorPaletteMap.set(name, new Map())
      }

      const virtualPath = replaceRootWithColorPalette(
        [...token.path],
        [...root],
      )

      const virtualName = formatTokenName(virtualPath)

      const virtualToken = getByName(virtualName)
      if (!virtualToken || !virtualToken.extensions.cssVar) return

      const { var: virtualVar } = virtualToken.extensions.cssVar

      colorPaletteMap.get(name)!.set(virtualVar, token.extensions.cssVar!.ref)

      if (isDefault && root.length === 1) {
        const colorPaletteName = formatTokenName(["colors", "colorPalette"])

        const colorPaletteToken = getByName(colorPaletteName)
        if (!colorPaletteToken) return

        const name = formatTokenName(token.path)

        const virtualToken = getByName(name)
        if (!virtualToken) return

        const keyPath = colorPalette.keys[0]?.filter(Boolean)
        if (!keyPath.length) return

        const computedName = formatTokenName(root.concat(keyPath))

        if (!colorPaletteMap.has(computedName)) {
          colorPaletteMap.set(computedName, new Map())
        }

        colorPaletteMap
          .get(computedName)!
          .set(
            colorPaletteToken.extensions.cssVar!.var,
            virtualToken.extensions.cssVar!.ref,
          )
      }
    })
  }

  let byCategoryJson: Record<string, Record<string, string>> = {}

  function setupViews() {
    allTokens.forEach((token) => {
      buildConditionMap(token)
      buildCategoryMap(token)
      buildCssVars(token)
      buildFlatMap(token)
      buildColorPalette(token)
    })

    byCategoryJson = mapToJson(byCategory)
  }

  const colorMix = (value: string, tokenFn: (path: string) => string) => {
    if (!value || typeof value !== "string") return { invalid: true, value }

    const [colorPath, rawOpacity] = value.split("/")

    if (!colorPath || !rawOpacity) {
      return { invalid: true, value: colorPath }
    }

    const colorToken = tokenFn(colorPath)
    const opacityToken = getByName(`opacity.${rawOpacity}`)?.value

    if (!opacityToken && isNaN(Number(rawOpacity))) {
      return { invalid: true, value: colorPath }
    }

    const percent = opacityToken
      ? Number(opacityToken) * 100 + "%"
      : `${rawOpacity}%`
    const color = colorToken ?? colorPath

    return {
      invalid: false,
      color,
      value: `color-mix(in srgb, ${color} ${percent}, transparent)`,
    }
  }

  const getVar = memo((value: string, fallback?: string) => {
    return flatMap.get(value) ?? fallback
  })

  const getCategoryValues = memo((category: string) => {
    return byCategoryJson[category] || null
  })

  const expandReferenceInValue = memo((value: string) => {
    return _expandReferences(value, (path) => {
      if (!path) return

      if (path.includes("/")) {
        const mix = colorMix(path, (v) => getVar(v)!)
        if (mix.invalid) {
          throw new Error("Invalid color mix at " + path + ": " + mix.value)
        }

        return mix.value
      }

      const resolved = getVar(path)
      if (resolved) return resolved

      // If the path includes an unresolved token reference, we need to escape it
      return TOKEN_PATH_REGEX.test(path) ? esc(path) : path
    })
  })

  const dictionary: TokenDictionary = {
    prefix,
    allTokens,
    tokenMap: tokenNameMap,
    registerToken,
    getByName,
    formatTokenName,
    formatCssVar,
    flatMap,
    cssVarMap,
    categoryMap,
    colorPaletteMap,
    getVar,
    getCategoryValues,
    expandReferenceInValue,
  }

  function registerTransform(...fns: TokenTransformer[]) {
    fns.forEach((fn) => {
      transforms.set(fn.name, fn)
    })
  }

  function registerMiddleware(...fns: TokenMiddleware[]) {
    middlewares.push(...fns)
  }

  function transformToken(transform: TokenTransformer, token: Token) {
    if (token.extensions.references) return
    if (isFunction(transform.match) && !transform.match(token)) return

    const fn = (v: Token) => transform.transform(v, dictionary)

    const transformed = fn(token)

    switch (true) {
      case transform.type === "extensions":
        Object.assign(token.extensions, transformed)
        break
      case transform.type === "value":
        token.value = transformed
        break
      default:
        token[transform.type] = transformed
        break
    }
  }

  function applyMiddlewares(enforce: TokenEnforcePhase) {
    middlewares.forEach((middleware) => {
      if (middleware.enforce === enforce) {
        middleware.transform(dictionary)
      }
    })
  }

  function applyTransforms(enforce: TokenEnforcePhase) {
    transforms.forEach((transform) => {
      if (transform.enforce === enforce) {
        allTokens.forEach((token) => {
          transformToken(transform, token)
        })
      }
    })
  }

  function addConditionalTokens() {
    allTokens.forEach((token) => {
      const tokens = getConditionalTokens(token)
      if (!tokens || tokens.length === 0) return
      tokens.forEach((token) => {
        registerToken(token)
      })
    })
  }

  function getTokenReferences(value: string) {
    const refs = getReferences(value)
    return refs.map((ref) => getByName(ref)).filter(Boolean) as Token[]
  }

  function addReferences() {
    allTokens.forEach((token) => {
      if (!hasReference(token.value)) return
      const references = getTokenReferences(token.value)
      token.extensions.references = references.reduce<Dict>((acc, ref) => {
        acc[ref.name] = ref
        return acc
      }, {})
    })
  }

  function expandTokenReferences() {
    allTokens.forEach((token) => {
      expandReferences(token)
    })
  }

  function build() {
    applyMiddlewares("pre")
    applyTransforms("pre")

    addConditionalTokens()

    addReferences()
    expandTokenReferences()

    applyMiddlewares("post")
    applyTransforms("post")

    setupViews()
  }

  registerTokens()
  registerTransform(...tokenTransforms)
  registerMiddleware(...tokenMiddlewares)
  build()

  return dictionary
}

function filterDefault(path: string[]) {
  if (path[0] === "DEFAULT") return path
  return path.filter((item) => item !== "DEFAULT")
}

function filterBaseCondition(path: string[]) {
  return path.filter((item) => item !== "base")
}

function getConditionalTokens(token: Token) {
  if (!token.extensions.conditions) return

  const { conditions } = token.extensions
  const tokens: Token[] = []

  walkObject(conditions, (value, path) => {
    const nextPath = filterBaseCondition(path)
    if (!nextPath.length) return

    const nextToken = structuredClone(token)

    nextToken.value = value
    nextToken.extensions.condition = nextPath.join(":")

    tokens.push(nextToken)
  })

  return tokens
}

function replaceRootWithColorPalette(path: string[], roots: string[]) {
  const startIndex = path.findIndex((_, index) =>
    roots.every(
      (rootElement, rootIndex) => path[index + rootIndex] === rootElement,
    ),
  )

  if (startIndex === -1) {
    return path
  }

  path.splice(startIndex, roots.length)
  path.splice(startIndex, 0, "colorPalette")

  return path
}

export const tokenCategories = createProps<Record<TokenCategory, any>>()([
  "aspectRatios",
  "zIndex",
  "opacity",
  "colors",
  "fonts",
  "fontSizes",
  "fontWeights",
  "lineHeights",
  "letterSpacings",
  "sizes",
  "shadows",
  "spacing",
  "radii",
  "cursor",
  "borders",
  "borderWidths",
  "borderStyles",
  "durations",
  "easings",
  "animations",
  "blurs",
  "gradients",
  "breakpoints",
  "assets",
])
