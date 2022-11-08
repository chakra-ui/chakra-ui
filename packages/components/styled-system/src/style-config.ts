import { runIfFn, isObject } from "@chakra-ui/shared-utils"
import mergeWith from "lodash.mergewith"
import { toMediaQueryString } from "@chakra-ui/breakpoint-utils"
import { ResponsiveValue, WithCSSVar } from "./utils"

type Theme = WithCSSVar<Record<string, any>>

type Config = {
  parts?: string[]
  baseStyle?: Record<string, any>
  variants?: Record<string, any>
  sizes?: Record<string, any>
}

type ValueType = ResponsiveValue<string | boolean>

function normalize(value: ValueType | undefined, toArray: (val: any) => any[]) {
  if (Array.isArray(value)) return value
  if (isObject(value)) return toArray(value)
  if (value != null) return [value]
}

//given [ 'sm', null, null, 'md' ] and i'm at "sm", find the next index that has non-null value
function getNextIndex(values: string[], i: number) {
  for (let j = i + 1; j < values.length; j++) {
    if (values[j] != null) return j
  }
  return -1
}

function createResolver(theme: Theme) {
  const breakpointUtil = theme.__breakpoints
  return function resolver(
    config: Config,
    prop: "variants" | "sizes",
    value: ValueType | undefined,
    props: Record<string, any>,
  ) {
    //
    if (!breakpointUtil) return

    const result: Record<string, any> = {}

    const normalized = normalize(value, breakpointUtil.toArrayValue)

    if (!normalized) return result

    const len = normalized.length
    const isSingle = len === 1

    const isMultipart = !!config.parts

    for (let i = 0; i < len; i++) {
      const key = breakpointUtil.details[i]
      const nextKey = breakpointUtil.details[getNextIndex(normalized, i)]
      const query = toMediaQueryString(key.minW, nextKey?._minW)

      const styles = runIfFn(config[prop]?.[normalized[i]], props)

      if (!styles) continue

      if (isMultipart) {
        config.parts?.forEach((part) => {
          mergeWith(result, {
            [part]: isSingle ? styles[part] : { [query]: styles[part] },
          })
        })
        continue
      }

      if (!isMultipart) {
        if (isSingle) mergeWith(result, styles)
        else result[query] = styles
        continue
      }

      result[query] = styles
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
