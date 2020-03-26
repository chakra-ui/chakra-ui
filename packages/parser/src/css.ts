import {
  deepmerge,
  get,
  getWithDefault,
  isArray,
  isObject,
  runIfFn,
  Dict,
} from "@chakra-ui/utils"
import { parsePseudo } from "./configs/pseudo"
import { CSSObject, StyleObjectOrFn } from "./css.types"
import { getMediaQuery, assignArrayValue, StyleConfig } from "./utils"
import { parser } from "./parser"

const hasTheme = (props: any): props is { theme: Dict } => {
  return Boolean(isObject(props) && props.theme)
}

type PropsOrTheme = Dict | { theme: Dict }

export const css = (input: StyleObjectOrFn) => (props: PropsOrTheme) => {
  const theme = hasTheme(props) ? props.theme : props

  let result: CSSObject = {}

  const styleObject = runIfFn(input, theme)
  const styles = parsePseudo(styleObject)

  const queries = getMediaQuery(theme.breakpoints)

  function compute(val: any, config: any) {
    if (!config) return val
    const scale = get(theme, config.scale, config.fallbackScale)

    if (config.transform) {
      return config.transform(val, scale)
    }

    return getWithDefault(val, scale)
  }

  function assignArray(prop: any, values: any, config: any) {
    return assignArrayValue({
      mediaQueries: queries.asArray,
      prop,
      values,
      transform: val => compute(val, config),
    })
  }

  for (const prop in styles) {
    const styleValue = styles[prop]

    const val = runIfFn(styleValue, theme)

    const config = parser.config[prop] as StyleConfig | undefined

    if (prop === "apply") {
      const extendStyles = css(get(theme, val))(theme)
      result = deepmerge(result, extendStyles)
      continue
    }

    if (isObject(val)) {
      const computedStyles = compute(val, config)
      result[prop] = css(computedStyles)(theme)
      continue
    }

    if (isArray(val)) {
      if (config?.properties) {
        config.properties.forEach((prop: any) => {
          const computedStyles = assignArray(prop, val, config)
          result = deepmerge(result, computedStyles)
        })
        continue
      }

      if (config?.property) {
        const computedStyles = assignArray(config.property, val, config)
        result = deepmerge(result, computedStyles)
        continue
      }

      // If no config exists and val is still an array
      // run it through `css` in-case it contains style props
      const _val = val.map((v: any) => css(v)(theme))

      const computedStyles = assignArray(prop, _val, config)
      result = deepmerge(result, computedStyles)
      continue
    }

    if (config?.properties) {
      config.properties.forEach((prop: any) => {
        result[prop] = compute(val, config)
      })
      continue
    }

    if (config?.property) {
      const computedStyles = compute(val, config)
      result[config.property] = computedStyles
      continue
    }

    result[prop] = compute(val, config)
  }

  return result
}
