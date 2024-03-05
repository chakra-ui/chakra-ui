import {
  Dict,
  compact,
  mergeWith as mergeProps,
  mergeWith,
  splitProps,
  uniq,
} from "@chakra-ui/utils"
import { createCssFn } from "./css"
import { RecipeCreatorFn, RecipeDefinition } from "./recipe.types"
import { Condition, CssFn } from "./types"

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
}

export function createRecipeFn(options: Options): RecipeCreatorFn {
  const { css, conditions, normalize } = options

  function cva(config: any) {
    const { base, variants, defaultVariants, compoundVariants } =
      defaults(config)

    const processor = createCssFn({
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

      mergeWith(variantCss, processor(variantSelections))

      const compoundVariantCss = getCompoundVariantCss(
        compoundVariants,
        variantSelections,
      )

      return css(variantCss, compoundVariantCss)
    }

    const variantKeys = Object.keys(variants)

    const splitVariantProps = (props: Dict) => {
      const { recipe: _, ...restProps } = props
      return splitProps(restProps, variantKeys)
    }

    const variantMap = Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [
        key,
        Object.keys(value as any),
      ]),
    )

    const cvaFn = (props: any) => css(resolve(props))
    return Object.assign(cvaFn, {
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

    const defaultVariants = mergeProps(
      cvaA.config.defaultVariants,
      override.defaultVariants,
    )

    const compoundVariants = [
      ...cvaA.compoundVariants,
      ...override.compoundVariants,
    ]

    return { base, variants, defaultVariants, compoundVariants }
  }
}
