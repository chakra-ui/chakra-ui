import {
  type Dict,
  compact,
  cx,
  mapEntries,
  memo,
  mergeWith,
  omit,
  splitProps,
  uniq,
  walkObject,
} from "../utils"
import { createCssFn } from "./css"
import type { RecipeCreatorFn, RecipeDefinition } from "./recipe.types"
import { EMPTY_OBJECT } from "./singleton"
import type { Condition, CssFn, Layers, SystemContext } from "./types"

const defaults = (conf: any): Required<RecipeDefinition> => ({
  base: EMPTY_OBJECT,
  variants: EMPTY_OBJECT,
  defaultVariants: EMPTY_OBJECT,
  compoundVariants: [],
  ...conf,
})

interface Options {
  normalize: (styles: Dict) => Dict
  normalizeValue: SystemContext["normalizeValue"]
  css: CssFn
  conditions: Condition
  layers: Layers
}

export function createRecipeFn(options: Options): RecipeCreatorFn {
  const { css, conditions, normalize, normalizeValue, layers } = options

  // Variant names are not CSS properties: normalizing them would rewrite
  // a `rounded` variant to `borderRadius`.
  const normalizeSelections = (selections: Dict) =>
    walkObject(selections, normalizeValue, {
      stop: (value) => Array.isArray(value),
    })

  function createCompoundVariantFn(compoundVariants: any[]) {
    const rules = compoundVariants.map((compoundVariant) => ({
      styles: compoundVariant.css,
      match: Object.entries(omit(compoundVariant, ["css"])).map(
        ([name, value]) =>
          [name, Array.isArray(value) ? value : [value]] as const,
      ),
    }))

    return function matchCompoundVariants(selections: Dict) {
      let result = EMPTY_OBJECT
      for (const { styles, match } of rules) {
        const matches = match.every(([name, values]) =>
          values.includes(selections[name]),
        )
        if (matches) result = css(result, styles)
      }
      return result
    }
  }

  function cva(config: Dict = {}) {
    const defaultsConfig = defaults(config)
    const { base, defaultVariants, compoundVariants } = defaultsConfig

    const matchCompoundVariants = createCompoundVariantFn(compoundVariants)

    const variants = mapEntries(defaultsConfig.variants, (key, obj) => [
      key,
      mapEntries(obj, (optionKey, styles) => [optionKey, normalize(styles)]),
    ])

    const getVariantCss = createCssFn({
      conditions,
      normalize: normalizeSelections,
      transform(prop, value) {
        return variants[prop]?.[value]
      },
    })

    const resolve = memo(function resolve(props: Dict = {}) {
      const selections = { ...defaultVariants, ...compact(props) }

      const variantCss = normalize(base)
      mergeWith(variantCss, getVariantCss(selections))

      return layers.wrap(
        "recipes",
        css(variantCss, matchCompoundVariants(selections)),
      )
    })

    const variantKeys = Object.keys(variants)

    const splitVariantProps = (props: Dict) => {
      const restProps = omit(props, ["recipe"])
      const [recipeProps, localProps] = splitProps(restProps, variantKeys)

      const hasColorPalette = variantKeys.includes("colorPalette")
      const hasOrientation = variantKeys.includes("orientation")

      if (!hasColorPalette) {
        recipeProps.colorPalette =
          props.colorPalette || defaultVariants.colorPalette
      }

      if (hasOrientation) {
        ;(localProps as any).orientation = props.orientation
      }

      return [recipeProps, localProps]
    }

    const variantMap = mapEntries(variants, (key, value) => [
      key,
      Object.keys(value as any),
    ])

    const cvaFn = memo(function cvaFn(props: any) {
      return css(resolve(props))
    })
    return Object.assign(cvaFn, {
      className: config.className,
      __cva__: true,
      variantMap,
      variantKeys,
      raw: resolve,
      config,
      splitVariantProps,
      merge(other: any) {
        return cva(mergeCva(this, other))
      },
    })
  }

  //@ts-expect-error
  return cva
}

const toRecipeConfig = (cva: any) =>
  (cva?.__cva__ ? cva.config : cva) ?? EMPTY_OBJECT

function mergeCva(cvaA: any, cvaB: any) {
  const a = defaults(toRecipeConfig(cvaA))
  const b = defaults(toRecipeConfig(cvaB))

  const variantKeys = uniq(Object.keys(a.variants), Object.keys(b.variants))

  const base = mergeWith({}, a.base, b.base)

  const variants = Object.fromEntries(
    variantKeys.map((key) => [
      key,
      mergeWith({}, a.variants[key], b.variants[key]),
    ]),
  )

  const defaultVariants = mergeWith({}, a.defaultVariants, b.defaultVariants)

  const compoundVariants = [...a.compoundVariants, ...b.compoundVariants]

  const className = cx((a as any).className, (b as any).className)

  return {
    className,
    base,
    variants,
    defaultVariants,
    compoundVariants,
  }
}
