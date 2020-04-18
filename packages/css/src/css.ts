import {
  assignArrayValue as responsiveArray,
  getMediaQuery,
  parsePseudo,
  parser,
  StyleConfig,
} from "@chakra-ui/parser"
import { get, isArray, isObject, merge, runIfFn } from "@chakra-ui/utils"
import { CSSObject, StyleObjectOrFn } from "./css.types"
import {
  determineTheme,
  PropsOrTheme,
  transformWithConfig as tx,
} from "./css.utils"

export const css = (object: StyleObjectOrFn) => (props: PropsOrTheme) => {
  const theme = determineTheme(props)

  let computedStyles: CSSObject = {}

  const styleObject = runIfFn(object, theme)
  const styles = parsePseudo(styleObject)

  const queries = getMediaQuery(theme.breakpoints)

  const responsive = (prop: any, values: any, config: any) => {
    return responsiveArray({
      mediaQueries: queries.asArray,
      prop,
      values,
      transform: function(value) {
        return tx(theme, value, config)
      },
    })
  }

  for (const key in styles) {
    const valOrFn = styles[key]
    const val = runIfFn(valOrFn, theme)

    const config = parser.config[key] as StyleConfig | undefined

    if (key === "apply") {
      const style = css(get(theme, val))(theme)
      computedStyles = merge(computedStyles, style)
      continue
    }

    if (isObject(val)) {
      const style = tx(theme, val, config)
      computedStyles[key] = css(style)(theme)
      continue
    }

    if (isArray(val)) {
      if (config?.properties) {
        config.properties.forEach((prop: any) => {
          const style = responsive(prop, val, config)
          computedStyles = merge(computedStyles, style)
        })
        continue
      }

      if (config?.property) {
        const style = responsive(config.property, val, config)
        computedStyles = merge(computedStyles, style)
        continue
      }

      // If no config exists and `val` is still an array
      // run it through `css` in-case it contains style props
      const _val = val.map((v: any) => css(v)(theme))

      const style = responsive(key, _val, config)
      computedStyles = merge(computedStyles, style)
      continue
    }

    if (config?.properties) {
      config.properties.forEach((prop: any) => {
        computedStyles[prop] = tx(theme, val, config)
      })
      continue
    }

    if (config?.property) {
      const style = tx(theme, val, config)
      computedStyles[config.property] = style
      continue
    }

    computedStyles[key] = tx(theme, val, config)
  }

  return computedStyles
}
