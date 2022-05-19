import { Dict, isArray, mergeWith, runIfFn, isObject } from "@chakra-ui/utils"
import { ResponsiveValue, WithCSSVar } from "./utils"

type Theme = WithCSSVar<Dict>

type Config = {
  parts?: string[]
  baseStyle?: Dict
  variants?: Dict
  sizes?: Dict
}

type ValueType = ResponsiveValue<string | boolean>

function normalize(value: ValueType | undefined, toArray: (val: any) => any[]) {
  if (isArray(value)) return value
  if (isObject(value)) return toArray(value)
  if (value != null) return [value]
}

function createResolver(theme: Theme) {
  const breakpointUtil = theme.__breakpoints
  return function resolver(
    config: Config,
    prop: "variants" | "sizes",
    value: ValueType | undefined,
    props: Dict,
  ) {
    //
    if (!breakpointUtil) return

    const result: Dict = {}

    const normalized = normalize(value, breakpointUtil.toArrayValue)

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
          mergeWith(result, {
            [part]: isSingle ? styles[part] : { [key.minWQuery]: styles[part] },
          })
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
          mergeWith(result, {
            [part]: isSingle
              ? styles[part]
              : { [key.minMaxQuery]: styles[part] },
          })
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
    const recipe = createResolver(theme)
    return mergeWith(
      {},
      runIfFn(config.baseStyle ?? {}, props),
      recipe(config, "sizes", size, props),
      recipe(config, "variants", variant, props),
    )
  }
}
