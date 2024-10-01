import {
  type Dict,
  compact,
  cx,
  mergeWith,
  omit,
  splitProps,
  uniq,
} from "../utils"
import { createCssFn } from "./css"
import type { RecipeCreatorFn, RecipeDefinition } from "./recipe.types"
import type { Condition, CssFn, Layers } from "./types"

const defaults = (conf: any): Required<RecipeDefinition> => ({
  base: {},
  variants: {},
  defaultVariants: {},
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
    const { base, variants, defaultVariants, compoundVariants } =
      defaults(config)

    const getVariantCss = createCssFn({
      conditions,
      normalize,
      transform(prop, value) {
        return variants[prop]?.[value]
      },
    })

    const resolve = (props = {}) => {
      const variantSelections: Dict = normalize({
        ...defaultVariants,
        ...compact(props),
      })

      let variantCss = { ...base }

      mergeWith(variantCss, getVariantCss(variantSelections))

      const compoundVariantCss = getCompoundVariantCss(
        compoundVariants,
        variantSelections,
      )

      return layers.wrap("recipes", css(variantCss, compoundVariantCss))
    }

    const variantKeys = Object.keys(variants)

    const splitVariantProps = (props: Dict) => {
      const restProps = omit(props, ["recipe"])
      const [recipeProps, localProps] = splitProps(restProps, variantKeys)

      if (!variantKeys.includes("colorPalette")) {
        recipeProps.colorPalette =
          props.colorPalette || defaultVariants.colorPalette
      }

      if (variantKeys.includes("orientation")) {
        ;(localProps as any).orientation = props.orientation
      }

      return [recipeProps, localProps]
    }

    const variantMap = Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [
        key,
        Object.keys(value as any),
      ]),
    )

    const cvaFn = (props: any) => css(resolve(props))
    return Object.assign(cvaFn, {
      className: config.className,
      __cva__: true,
      variantMap,
      variantKeys,
      raw: resolve,
      config,
      splitVariantProps,
      merge(other: any) {
        return cva(mergeCva(options)(this, other))
      },
    })
  }

  function getCompoundVariantCss(cvs: any[], vm: any) {
    let result = {}
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

function mergeCva(opts: Options) {
  const { css } = opts

  return function mergeCva(cvaA: any, cvaB: any) {
    const override = defaults(cvaB.config)
    const variantKeys = uniq(cvaA.variantKeys, Object.keys(cvaB.variants))

    const base = css(cvaA.base, override.base)

    const variants = Object.fromEntries(
      variantKeys.map((key) => [
        key,
        css(cvaA.config.variants[key], override.variants[key]),
      ]),
    )

    const defaultVariants = mergeWith(
      cvaA.config.defaultVariants,
      override.defaultVariants,
    )

    const compoundVariants = [
      ...cvaA.compoundVariants,
      ...override.compoundVariants,
    ]

    const className = cx(cvaA.className, cvaB.className)

    return {
      className,
      base,
      variants,
      defaultVariants,
      compoundVariants,
    }
  }
}
