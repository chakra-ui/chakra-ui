import { Dict, isObject } from "@chakra-ui/utils"
import type { ThemeScale } from "../create-theme-vars"
import type { Transform } from "./types"

interface CreateTransformOptions {
  scale: ThemeScale
  compose?: Transform
  transform?: Transform
}

const isImportant = (value: string) => /(!|important)$/.test(value)

const withoutImportant = (value: string) =>
  value.replace(/(!|!important)$/, "").trim()

export const tokenToCSSVar =
  (scale: ThemeScale, value: any) => (theme: Dict) => {
    const valueStr = String(value)

    const important = isImportant(valueStr)
    const _value = withoutImportant(valueStr)

    const key = scale ? `${scale}.${_value}` : _value

    const transformed =
      isObject(theme.__cssMap) && key in theme.__cssMap
        ? theme.__cssMap[key].varRef
        : value

    return important ? `${transformed} !important` : transformed
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
