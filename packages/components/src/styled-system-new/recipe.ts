import {
  Dict,
  compact,
  memo,
  mergeWith as mergeProps,
  splitProps,
  uniq,
} from "@chakra-ui/utils"
import { RecipeConfig, RecipeCreatorFn } from "./recipe.types"
import { SystemStyleObject } from "./system"

const defaults = (conf: any): Required<RecipeConfig> => ({
  base: {},
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
  ...conf,
})

interface Options {
  css(...styles: SystemStyleObject[]): SystemStyleObject
}

export function createRecipeFn(options: Options): RecipeCreatorFn {
  const { css } = options
  function cva(config: any) {
    const { base, variants, defaultVariants, compoundVariants } =
      defaults(config)

    const resolve = (props = {}) => {
      const variantSelections: Dict = { ...defaultVariants, ...compact(props) }

      let variantCss = { ...base }

      for (const [key, value] of Object.entries(variantSelections)) {
        if (variants[key]?.[value]) {
          variantCss = css(variantCss, variants[key][value])
        }
      }

      const compoundVariantCss = getCompoundVariantCss(
        compoundVariants,
        variantSelections,
      )

      return css(variantCss, compoundVariantCss)
    }

    const cvaFn = memo((props) => css(resolve(props)))
    const variantKeys = Object.keys(variants)
    const splitVariantProps = (props: Dict) => splitProps(props, variantKeys)

    const variantMap = Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [
        key,
        Object.keys(value as any),
      ]),
    )

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
    let res = {}
    cvs.forEach((cv) => {
      const isMatching = Object.entries(cv).every(([key, value]) => {
        if (key === "css") return true
        const values = Array.isArray(value) ? value : [value]
        return values.some((value) => vm[key] === value)
      })
      if (isMatching) {
        res = css(res, cv.css)
      }
    })

    return res
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
