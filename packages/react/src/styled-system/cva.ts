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
} from "../utils"
import { createCssFn } from "./css"
import type { RecipeCreatorFn, RecipeDefinition } from "./recipe.types"
import { EMPTY_OBJECT } from "./singleton"
import type { Condition, CssFn, Layers } from "./types"

const defaults = (conf: any): Required<RecipeDefinition> => ({
  base: EMPTY_OBJECT,
  variants: EMPTY_OBJECT,
  defaultVariants: EMPTY_OBJECT,
  compoundVariants: [],
  ...conf,
})

interface Options {
  normalize: (styles: Dict) => Dict
  css: CssFn
  conditions: Condition
  layers: Layers
}

export function createRecipeFn(options: Options): RecipeCreatorFn {
  const { css, conditions, normalize, layers } = options

  function cva(config: Dict = {}) {
    const defaultsConfig = defaults(config)
    const { base, defaultVariants, compoundVariants } = defaultsConfig

    const variants = mapEntries(defaultsConfig.variants, (key, obj) => [
      key,
      mapEntries(obj, (optionKey, styles) => [optionKey, normalize(styles)]),
    ])

    const getVariantCss = createCssFn({
      conditions,
      normalize,
      transform(prop, value) {
        return variants[prop]?.[value]
      },
    })

    const resolve = memo(function resolve(props: Dict = {}) {
      const variantSelections: Dict = normalize({
        ...defaultVariants,
        ...compact(props),
      })

      let variantCss = { ...normalize(base) }

      mergeWith(variantCss, getVariantCss(variantSelections))

      const compoundVariantCss = getCompoundVariantCss(
        compoundVariants,
        variantSelections,
      )

      return layers.wrap("recipes", css(variantCss, compoundVariantCss))
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

  function getCompoundVariantCss(cvs: any[], vm: any) {
    let result = EMPTY_OBJECT
    cvs.forEach((cv) => {
      const isMatching = Object.entries(cv).every(([key, value]) => {
        if (key === "css") return true
        const values = Array.isArray(value) ? value : [value]
        return values.some((value) => vm[key] === value)
      })
      if (isMatching) {
        result = css(result, cv.css)
      }
    })

    return result
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
