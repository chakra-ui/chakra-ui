import {
  Dict,
  isArray,
  isObject,
  mergeWith as merge,
  runIfFn,
} from "@chakra-ui/utils"
import * as CSS from "csstype"
import { Config, PropConfig } from "./prop-config"
import { pseudoSelectors } from "./pseudos"
import sort from "./sort"
import { systemProps } from "./system"
import { StyleObjectOrFn, CssTheme } from "./types"

interface Options {
  configs?: Config
  pseudos?: Record<string, CSS.Pseudos | (string & {})>
}

export function getCss(theme: CssTheme, options: Options) {
  const { configs, pseudos } = options

  return {
    expandResponsive(styles: Dict) {
      if (!theme.__breakpoints) return styles
      const { isResponsive, toArrayValue, media: medias } = theme.__breakpoints
      const result: Dict = {}
      for (const key in styles) {
        let value = runIfFn(styles[key], theme)
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
        const value = runIfFn(valueOrFn, theme)

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

        let rawValue = config?.transform?.(value, theme) ?? value

        rawValue = config?.processResult
          ? this.expandStyles(this.expandResponsive(rawValue), true)
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
      return sort(result)
    },

    process(styles: Dict) {
      styles = runIfFn(styles, theme)
      const responsive = this.expandResponsive(styles)
      return this.expandStyles(responsive)
    },
  }
}

export const css = (styles: StyleObjectOrFn) => (theme: Dict) =>
  getCss(theme as any, {
    pseudos: pseudoSelectors,
    configs: systemProps,
  }).process(styles)
