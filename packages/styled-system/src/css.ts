import { Dict, isObject, mergeWith as merge, runIfFn } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { expandResponsive } from "./expand-responsive"
import { Config, PropConfig } from "./prop-config"
import { pseudoSelectors } from "./pseudos"
import { systemProps as systemPropConfigs } from "./system"
import { CssTheme, StyleObjectOrFn } from "./types"

const isCSSVar = (key: string) => key.startsWith("--")

interface GetCSSOptions {
  theme: CssTheme
  configs?: Config
  pseudos?: Record<string, CSS.Pseudos | (string & {})>
}

export function getCss(options: GetCSSOptions) {
  const { configs = {}, pseudos = {}, theme } = options

  const css = (stylesOrFn: Dict, nested = false) => {
    const _styles = runIfFn(stylesOrFn, theme)
    const styles = expandResponsive(_styles)(theme)

    let computedStyles: Dict = {}

    for (let key in styles) {
      const valueOrFn = styles[key]

      /**
       * allows the user to pass functional values
       * boxShadow: theme => `0 2px 2px ${theme.colors.red}`
       */
      let value = runIfFn(valueOrFn, theme)

      /**
       * converts pseudo shorthands to valid selector
       * "_hover" => "&:hover"
       */
      if (key in pseudos) {
        key = pseudos[key]
      }

      /**
       * allows the user to use theme tokens in css vars
       * { --banner-height: "sizes.md" } => { --banner-height: "var(--chakra-sizes-md)" }
       */
      if (isCSSVar(key) && theme.__cssMap[value]) {
        value = theme.__cssMap[value].varRef
      }

      let config = configs[key]

      if (config === true) {
        config = { property: key } as PropConfig
      }

      if (isObject(value)) {
        computedStyles[key] = computedStyles[key] ?? {}
        computedStyles[key] = merge({}, computedStyles[key], css(value, true))
        continue
      }

      let rawValue = config?.transform?.(value, theme, _styles) ?? value

      /**
       * Used for `layerStyle`, `textStyle` and `apply`. After getting the
       * styles in the theme, we need to process them since they might
       * contain theme tokens.
       *
       * `processResult` is the config property we pass to `layerStyle`, `textStyle` and `apply`
       */
      rawValue = config?.processResult ? css(rawValue, true) : rawValue

      /**
       * allows us define css properties for RTL and LTR.
       *
       * const marginStart = {
       *   property: theme => theme.direction === "rtl" ? "marginRight": "marginLeft",
       * }
       */
      const configProperty = runIfFn(config?.property, theme)

      if (!nested && config?.static) {
        const staticStyles = runIfFn(config.static, theme)
        computedStyles = merge({}, computedStyles, staticStyles)
      }

      if (configProperty && Array.isArray(configProperty)) {
        for (const property of configProperty) {
          computedStyles[property] = rawValue
        }
        continue
      }

      if (configProperty) {
        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = merge({}, computedStyles, rawValue)
        } else {
          computedStyles[configProperty as string] = rawValue
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
