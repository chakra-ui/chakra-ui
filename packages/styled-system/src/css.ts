import { Dict, isCssVar, isObject, isString, runIfFn } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { pseudoSelectors } from "./pseudos"
import { systemProps as systemPropConfigs } from "./system"
import { StyleObjectOrFn } from "./system.types"
import { Config } from "./utils/prop-config"
import { CssTheme } from "./utils/types"

const isCSSVariableTokenValue = (key: string, value: any): value is string =>
  key.startsWith("--") && isString(value) && !isCssVar(value)

const resolveTokenValue = (theme: Dict, value: string) => {
  if (value == null) return value

  const getVar = (val: string) => theme.__cssMap?.[val]?.varRef
  const getValue = (val: string) => getVar(val) ?? val

  const valueSplit = value.split(",").map((v) => v.trim())
  const [tokenValue, fallbackValue] = valueSplit
  value = getVar(tokenValue) ?? getValue(fallbackValue) ?? getValue(value)

  return value
}

interface GetCSSOptions {
  theme: CssTheme
  configs?: Config
  pseudos?: Record<string, CSS.Pseudos | (string & {})>
}

export function getCss(options: GetCSSOptions) {
  const { configs = {}, pseudos = {}, theme } = options

  /**
   * Before any style can be processed, the user needs to call `toCSSVar`
   * which analyzes the theme's breakpoint and appends a `__breakpoints` property
   * to the theme with more details of the breakpoints.
   *
   * To learn more, go here: packages/utils/src/breakpoint.ts #analyzeBreakpoints
   */
  if (!theme.__breakpoints) return () => ({})
  const { isResponsive, toArrayValue, media: medias } = theme.__breakpoints

  const css = (stylesOrFn: Dict, nested = false) => {
    const styles = runIfFn(stylesOrFn, theme)

    let computedStyles: Dict = {}

    for (let key in styles) {
      /**
       * allows the user to pass functional values
       * boxShadow: theme => `0 2px 2px ${theme.colors.red}`
       */
      let value = runIfFn(styles[key], theme)
      if (value == null) continue

      if (Array.isArray(value) || (isObject(value) && isResponsive(value))) {
        let values = Array.isArray(value) ? value : toArrayValue(value)
        values = values.slice(0, medias.length)

        for (let index = 0; index < values.length; index++) {
          const media = medias[index]
          const val = values[index]

          if (media) {
            if (val == null) {
              computedStyles[media] ??= {}
            } else {
              computedStyles[media] = Object.assign(
                {},
                computedStyles[media],
                css({ [key]: val }, true),
              )
            }
          } else {
            computedStyles = Object.assign(
              {},
              computedStyles,
              css({ ...styles, [key]: val }, false),
            )
          }
        }

        continue
      }

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
       *
       * You can also provide fallback values
       * { --banner-height: "sizes.no-exist, 40px" } => { --banner-height: "40px" }
       */
      if (isCSSVariableTokenValue(key, value)) {
        value = resolveTokenValue(theme, value)
      }

      if (isObject(value)) {
        computedStyles[key] = Object.assign(
          {},
          computedStyles[key],
          css(value, true),
        )
        continue
      }

      let config = configs[key]
      if (config === true) {
        config = { property: key }
      }
      if (!nested && config?.static) {
        const staticStyles = runIfFn(config.static, theme)
        computedStyles = Object.assign({}, computedStyles, staticStyles)
      }

      let rawValue = config?.transform?.(value, theme, styles) ?? value

      /**
       * Used for `layerStyle`, `textStyle` and `apply`. After getting the
       * styles in the theme, we need to process them since they might
       * contain theme tokens.
       *
       * `processResult` is the config property we pass to `layerStyle`, `textStyle` and `apply`
       */
      rawValue = config?.processResult ? css(rawValue, true) : rawValue

      if (isObject(rawValue)) {
        computedStyles = Object.assign({}, computedStyles, rawValue)
        continue
      }

      /**
       * allows us to define css properties for RTL and LTR.
       *
       * const marginStart = {
       *   property: theme => theme.direction === "rtl" ? "marginRight": "marginLeft",
       * }
       */
      const configProperty = runIfFn(config?.property, theme)
      if (configProperty) {
        if (Array.isArray(configProperty)) {
          for (const property of configProperty) {
            computedStyles[property] = rawValue
          }
          continue
        }

        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = Object.assign({}, computedStyles, rawValue)
        } else {
          computedStyles[configProperty] = rawValue
        }
        continue
      }

      computedStyles[key] = rawValue
    }

    return computedStyles
  }

  return css
}

export const css = (styles: StyleObjectOrFn) => (theme: CssTheme) => {
  const cssFn = getCss({
    theme,
    pseudos: pseudoSelectors,
    configs: systemPropConfigs,
  })
  return cssFn(styles)
}
