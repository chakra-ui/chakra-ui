import { Dict, isObject, mergeWith as merge, runIfFn } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { Config, PropConfig } from "./prop-config"
import { pseudoSelectors } from "./pseudos"
import { systemProps as systemPropConfigs } from "./system"
import { CssTheme, StyleObjectOrFn } from "./types"

export const expandResponsive = (styles: Dict) => (theme: Dict) => {
  if (!theme.__breakpoints) return styles
  const { isResponsive, toArrayValue, media: medias } = theme.__breakpoints

  const computedStyles: Dict = {}

  for (const key in styles) {
    let value = runIfFn(styles[key], theme)

    if (value == null) continue

    value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value

    if (!Array.isArray(value)) {
      computedStyles[key] = value
      continue
    }

    const queries = value.slice(0, medias.length).length

    for (let index = 0; index < queries; index += 1) {
      const media = medias?.[index]

      if (!media) {
        computedStyles[key] = value[index]
        continue
      }

      computedStyles[media] = computedStyles[media] || {}

      if (value[index] == null) {
        continue
      }

      computedStyles[media][key] = value[index]
    }
  }

  return computedStyles
}

interface Options {
  theme: CssTheme
  configs?: Config
  pseudos?: Record<string, CSS.Pseudos | (string & {})>
}

export function getCss(options: Options) {
  const { configs = {}, pseudos = {}, theme } = options

  const css = (stylesOrFn: Dict, nested = false) => {
    const _styles = runIfFn(stylesOrFn, theme)
    const styles = expandResponsive(_styles)(theme)

    let computedStyles: Dict = {}

    for (const k in styles) {
      const valueOrFn = styles[k]
      const value = runIfFn(valueOrFn, theme)
      const key = k in pseudos ? pseudos[k] : k

      let config = configs[key]

      if (config === true) {
        config = { property: key } as PropConfig
      }

      if (isObject(value)) {
        computedStyles[key] = css(value, true)
        continue
      }

      let rawValue = config?.transform?.(value, theme) ?? value
      rawValue = config?.processResult ? css(rawValue, true) : rawValue

      if (config?.property) {
        config.property = runIfFn(config.property, theme)
      }

      if (!nested && config?.static) {
        const staticStyles = runIfFn(config.static, theme)
        computedStyles = merge({}, computedStyles, staticStyles)
      }

      if (config?.property && Array.isArray(config?.property)) {
        for (const property of config.property) {
          computedStyles[property] = rawValue
        }
        continue
      }

      if (config?.property) {
        if (config.property === "&" && isObject(rawValue)) {
          computedStyles = merge({}, computedStyles, rawValue)
        } else {
          computedStyles[config.property as string] = rawValue
        }
        continue
      }

      if (isObject(rawValue)) {
        computedStyles = merge({}, computedStyles, rawValue)
        continue
      }

      computedStyles[key] = rawValue
    }

    return computedStyles
  }

  return css
}

export const css = (styles: StyleObjectOrFn) => (theme: any) => {
  const cssFn = getCss({
    theme,
    pseudos: pseudoSelectors,
    configs: systemPropConfigs,
  })
  return cssFn(styles)
}
