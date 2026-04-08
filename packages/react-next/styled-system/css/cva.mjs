import { compact, mergeProps, memo, splitProps, uniq } from '../helpers.mjs';
import { css, mergeCss } from './css.mjs';

const defaults = (conf) => ({
  base: {},
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
  ...conf,
})

export function cva(config) {
  const { base, variants, defaultVariants, compoundVariants } = defaults(config)
  const getVariantProps = (variants) => ({ ...defaultVariants, ...compact(variants) })

  function resolve(props = {}) {
    const computedVariants = getVariantProps(props)
    let variantCss = { ...base }
    for (const [key, value] of Object.entries(computedVariants)) {
      if (variants[key]?.[value]) {
        variantCss = mergeCss(variantCss, variants[key][value])
      }
    }
    const compoundVariantCss = getCompoundVariantCss(compoundVariants, computedVariants)
    return mergeCss(variantCss, compoundVariantCss)
  }

  function merge(__cva) {
    const override = defaults(__cva.config)
    const variantKeys = uniq(__cva.variantKeys, Object.keys(variants))
    return cva({
      base: mergeCss(base, override.base),
      variants: Object.fromEntries(
        variantKeys.map((key) => [key, mergeCss(variants[key], override.variants[key])]),
      ),
      defaultVariants: mergeProps(defaultVariants, override.defaultVariants),
      compoundVariants: [...compoundVariants, ...override.compoundVariants],
    })
  }

  function cvaFn(props) {
    return css(resolve(props))
  }

  const variantKeys = Object.keys(variants)

  function splitVariantProps(props) {
    return splitProps(props, variantKeys)
  }

  const variantMap = Object.fromEntries(Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]))

  return Object.assign(memo(cvaFn), {
    __cva__: true,
    variantMap,
    variantKeys,
    raw: resolve,
    config,
    merge,
    splitVariantProps,
    getVariantProps
  })
}

export function getCompoundVariantCss(compoundVariants, variantMap) {
  let result = {}
  compoundVariants.forEach((compoundVariant) => {
    const isMatching = Object.entries(compoundVariant).every(([key, value]) => {
      if (key === 'css') return true

      const values = Array.isArray(value) ? value : [value]
      return values.some((value) => variantMap[key] === value)
    })

    if (isMatching) {
      result = mergeCss(result, compoundVariant.css)
    }
  })

  return result
}

export function assertCompoundVariant(name, compoundVariants, variants, prop) {
  if (compoundVariants.length > 0 && typeof variants?.[prop] === 'object') {
    throw new Error(`[recipe:${name}:${prop}] Conditions are not supported when using compound variants.`)
  }
}
