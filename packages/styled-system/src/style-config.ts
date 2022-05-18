/* eslint-disable no-nested-ternary */
import { Dict, isArray, mergeWith, runIfFn } from "@chakra-ui/utils"
import { isObject } from "lodash"
import { ResponsiveValue, WithCSSVar } from "./utils"

type Theme = WithCSSVar<Dict>

type Config = {
  parts?: string[]
  baseStyle?: Dict
  variants?: Dict
  sizes?: Dict
}

type ValueType = ResponsiveValue<string | boolean>

function createRecipe(theme: Theme) {
  const breakpointUtil = theme.__breakpoints
  return function recipe(
    config: Config,
    prop: "variants" | "sizes",
    value: ValueType | undefined,
    props: Dict,
  ) {
    //
    if (!breakpointUtil) return

    const result: Dict = {}

    let normalized: any[] | undefined
    if (isArray(value)) normalized = value
    else if (isObject(value)) normalized = breakpointUtil.toArrayValue(value)
    else if (value !== null) normalized = [value]

    if (!normalized) return result

    const len = normalized.length
    const isSingle = len === 1

    const isMultipart = !!config.parts

    for (let i = 0; i < len; i++) {
      const key = breakpointUtil.details[i]
      const styles = runIfFn(config[prop]?.[normalized[i]], props)

      if (!styles) continue

      const last = i === len - 1

      if (last && isMultipart) {
        config.parts?.forEach((part) => {
          if (isSingle) {
            mergeWith(result, { [part]: styles[part] })
          } else {
            mergeWith(result, { [part]: { [key.minWQuery]: styles[part] } })
          }
        })
        continue
      }

      if (last && !isMultipart) {
        if (isSingle) {
          mergeWith(result, styles)
        } else {
          result[key.minWQuery] = styles
        }
        continue
      }

      if (isMultipart) {
        config.parts?.forEach((part) => {
          if (isSingle) {
            mergeWith(result, { [part]: styles[part] })
          } else {
            mergeWith(result, { [part]: { [key.minMaxQuery]: styles[part] } })
          }
        })
        continue
      }

      result[key.minMaxQuery] = styles
    }

    return result
  }
}

type Values = {
  theme: Theme
  variant?: ValueType
  size?: ValueType
}

export function resolveStyleConfig(config: Config) {
  return (props: Values) => {
    const { variant, size, theme } = props
    const recipe = createRecipe(theme)
    const result: Dict = {}
    return mergeWith(
      result,
      runIfFn(config.baseStyle ?? {}, props),
      recipe(config, "variants", variant, props),
      recipe(config, "sizes", size, props),
    )
  }
}
