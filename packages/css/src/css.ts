import {
  assignArray,
  getMediaQuery,
  parsePseudo,
  parser,
  StyleConfig,
} from "@chakra-ui/parser"
import {
  get,
  isArray,
  isObject,
  isResponsiveObjectLike,
  merge,
  objectToArrayNotation,
  runIfFn,
} from "@chakra-ui/utils"
import { CSSObject, StyleObjectOrFn } from "./css.types"
import {
  determineTheme,
  PropsOrTheme,
  transformWithConfig as tx,
} from "./css.utils"

export const css = (styleObject: StyleObjectOrFn = {}) => (
  props: PropsOrTheme,
) => {
  const theme = determineTheme(props)

  let computedStyles: CSSObject = {}

  const style = runIfFn(styleObject, theme)
  const styles = parsePseudo(style)

  const queries = getMediaQuery(theme.breakpoints)

  const responsive = (prop: any, values: any, config: any) => {
    return assignArray({
      mediaQueries: queries.asArray,
      prop,
      values,
      transform: function (value) {
        return tx(theme, value, config)
      },
    })
  }

  for (const key in styles) {
    /**
     * @see https://github.com/chakra-ui/chakra-ui/pull/884
     *
     * Given that the `css` function only accepts responsive arrays,
     * to support reponsive objects in the css function, we do 2 things:
     *
     * - Check if the object is "responsive-like", e.g "{ base: "20px", sm: "50px" }"
     * so it doesn't think it's a nested style object.
     *
     * - Convert the responsive-like value back to array format that the `css` function
     * can handle.
     */
    const valueOrFn = styles[key]
    let value = runIfFn(valueOrFn, theme)
    if (value && isResponsiveObjectLike(value)) {
      value = objectToArrayNotation(value)
    }

    const config = parser.config[key] as StyleConfig | undefined

    if (key === "apply") {
      const style = css(get(theme, value))(theme)
      computedStyles = merge(computedStyles, style)
      continue
    }

    if (isObject(value)) {
      const style = tx(theme, value, config)
      computedStyles[key] = css(style)(theme)
      continue
    }

    if (isArray(value)) {
      if (config?.properties) {
        config.properties.forEach((prop: any) => {
          const style = responsive(prop, value, config)
          computedStyles = merge(computedStyles, style)
        })
        continue
      }

      if (config?.property) {
        const style = responsive(config.property, value, config)
        computedStyles = merge(computedStyles, style)
        continue
      }

      if (config === true) {
        const style = responsive(key, value, config)
        computedStyles = merge(computedStyles, style)
        continue
      }

      /**
       * If no config exists and `value` is still an array
       * run it through `css` in-case it contains style props
       */
      if (isArray(value)) {
        const val = value.map((v: any) => css(v)(theme))
        const style = responsive(key, val, config)
        computedStyles = merge(computedStyles, style)
        continue
      }
    }

    if (config?.properties) {
      config.properties.forEach((prop: any) => {
        computedStyles[prop] = tx(theme, value, config)
      })
      continue
    }

    if (config?.property) {
      const style = tx(theme, value, config)
      computedStyles[config.property] = style
      continue
    }

    computedStyles[key] = tx(theme, value, config)
  }

  return computedStyles
}

export default css
