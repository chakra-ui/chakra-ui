import { Dict, isObject } from "@chakra-ui/utils"
import type { ThemeScale } from "../create-theme-vars"
import type { Transform } from "./types"

interface CreateTransformOptions {
  scale: ThemeScale
  compose?: Transform
  transform?: Transform
}

export const tokenToCSSVar = (scale: ThemeScale, value: any) => (
  theme: Dict,
) => {
  const valueStr = String(value)
  const key = scale ? `${scale}.${valueStr}` : valueStr
  return isObject(theme.__cssMap) && key in theme.__cssMap
    ? theme.__cssMap[key].varRef
    : value
}

export function createTransform(options: CreateTransformOptions) {
  const { scale, transform, compose } = options

  const fn: Transform = (value, theme) => {
    const _value = tokenToCSSVar(scale, value)(theme)
    let result = transform?.(_value, theme) ?? _value
    if (compose) {
      result = compose(result, theme)
    }
    return result
  }

  return fn
}
