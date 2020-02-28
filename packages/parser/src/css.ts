import { Dict, isObject, runIfFn, deepmerge, isArray } from "@chakra-ui/utils"
import { assignArrayValue } from "./create-processor"
import { getMediaQuery } from "./media-query"
import { parsePseudo } from "./configs/pseudo"
import { getValue, get } from "./get"
import parser from "./parser"

const css = (args: Dict) => (props: Dict) => {
  const isThemeInProps = isObject(props) && props.theme
  const theme = isThemeInProps ? props.theme : props

  let result: Dict = {}

  const styleObject = runIfFn(args, theme)
  const styles = parsePseudo(styleObject)

  const queries = getMediaQuery(theme.breakpoints)

  function compute(val: any, config: any) {
    if (!config) return val
    const scale = get(theme, config.scale, config.fallbackScale)

    if (config.transform) {
      return config.transform(val, scale)
    }

    return getValue(val, scale)
  }

  function assignArray(prop: any, values: any, config: any) {
    return assignArrayValue({
      mediaQueries: queries.asArray,
      prop,
      values,
      transform: val => compute(val, config),
    })
  }

  for (const key in styles) {
    const styleValue = styles[key]
    const val = runIfFn(styleValue, theme)
    const config = parser.config[key] as any

    if (key === "apply") {
      const extendStyles = css(get(theme, val))(theme)
      result = deepmerge(result, extendStyles)
      continue
    }

    if (isObject(val)) {
      const computedStyles = compute(val, config)
      result[key] = css(computedStyles)(theme)
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

      const computedStyles = assignArray(key, val, config)
      result = deepmerge(result, computedStyles)
      continue
    }

    if (config?.properties) {
      config.properties.forEach((prop: any) => {
        const computedStyles = compute(val, config)
        result[prop] = computedStyles
      })
      continue
    }

    if (config?.property) {
      const computedStyles = compute(val, config)
      result[config.property] = computedStyles
      continue
    }

    const computedStyles = { [key]: compute(val, config) }
    result = deepmerge(result, computedStyles)
  }

  return result
}

export default css
