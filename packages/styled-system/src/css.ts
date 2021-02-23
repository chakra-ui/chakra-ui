import {
  Dict,
  isArray,
  isObject,
  mergeWith as merge,
  runIfFn,
} from "@chakra-ui/utils"
import * as CSS from "csstype"
import { analyzeBreakpoints } from "./breakpoints"
import { themeCache } from "./cache"
import { Config, PropConfig } from "./prop-config"
import { pseudoSelectors } from "./pseudos"
import { systemProps } from "./system"
import { CachedValue, StyleObjectOrFn, Theme } from "./types"

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

const sort = (obj: Dict) => {
  const next: Dict = {}
  Object.keys(obj)
    .sort((a, b) => collator.compare(a, b))
    .forEach((key) => {
      next[key] = obj[key]
    })
  return next
}

interface Options {
  configs?: Config
  pseudos?: Record<string, CSS.Pseudos | (string & {})>
}

const checkCache = (theme: Theme) => {
  let cache: CachedValue
  if (themeCache.has(theme)) {
    cache = themeCache.get(theme) as CachedValue
  } else {
    cache = {
      theme,
      breakpoint: analyzeBreakpoints(theme.breakpoints ?? {}),
    }
    themeCache.set(theme, cache)
  }
  return cache
}

export function getCss(theme: Theme, options: Options) {
  const { configs, pseudos } = options
  const cache = checkCache(theme)
  const { isResponsive, toArrayValue, media: medias } = cache.breakpoint

  return {
    expandResponsive(styles: Dict) {
      const result: Dict = {}
      for (const key in styles) {
        let value = runIfFn(styles[key], cache.theme)
        if (value == null) continue

        if (isObject(value)) {
          value = isResponsive(value)
            ? toArrayValue(value)
            : this.expandResponsive(value)
        }

        if (!isArray(value)) {
          result[key] = value
          continue
        }

        const mediaLength = value.slice(0, medias.length).length

        for (let i = 0; i < mediaLength; i += 1) {
          const media = medias?.[i]

          if (!media) {
            result[key] = value[i]
            continue
          }

          result[media] = result[media] || {}
          if (value[i] == null) continue
          result[media][key] = value[i]
        }
      }

      return result
    },

    expandStyles(styles: Dict, nested = false) {
      const result: Dict = {}

      for (let key in styles) {
        const valueOrFn = styles[key]
        const value = runIfFn(valueOrFn, cache.theme)

        if (pseudos && key in pseudos) {
          key = pseudos[key]
        }

        if (isObject(value)) {
          result[key] = this.expandStyles(value, true)
          continue
        }

        let config = configs?.[key]

        if (config === true) {
          config = { property: key } as PropConfig
        }

        if (config?.property) {
          config.property = runIfFn(config.property, theme)
        }

        if (!nested && config?.static) {
          const staticStyles = runIfFn(config.static, theme)
          merge(result, staticStyles)
        }

        let rawValue = config?.transform?.(value, cache.theme) ?? value

        rawValue = config?.returnsThemeAwareStyles
          ? this.expandStyles(rawValue, true)
          : rawValue

        if (config && isArray(config.property)) {
          for (const property of config.property) {
            result[property as string] = rawValue
          }
          continue
        }

        if (config?.property) {
          result[config.property as string] = rawValue
          continue
        }

        if (isObject(rawValue)) {
          merge(result, rawValue)
          continue
        }

        result[key] = rawValue
      }
      return result
    },

    process(styles: Dict) {
      const responsive = this.expandResponsive(styles)
      const result = this.expandStyles(responsive)
      return sort(result)
    },
  }
}

export const css = (styles: StyleObjectOrFn) => (theme: Theme) =>
  getCss(theme, {
    pseudos: pseudoSelectors,
    configs: systemProps,
  }).process(styles)
