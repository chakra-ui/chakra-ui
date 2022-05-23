import { Dict, isObject, isString } from "@chakra-ui/utils"
import type { ThemeScale } from "../create-theme-vars"
import type { Transform } from "./types"

interface CreateTransformOptions {
  scale: ThemeScale
  compose?: Transform
  transform?: Transform
}

const isImportant = (value: string) => /!(important)?$/.test(value)

const withoutImportant = (value: string | number) =>
  isString(value) ? value.replace(/!(important)?$/, "").trim() : value

export const tokenToCSSVar =
  (scale: ThemeScale, value: any) => (theme: Dict) => {
    const valueStr = String(value)

    const important = isImportant(valueStr)
    const valueWithoutImportant = withoutImportant(valueStr)

    const key = scale
      ? `${scale}.${valueWithoutImportant}`
      : valueWithoutImportant

    let transformed =
      isObject(theme.__cssMap) && key in theme.__cssMap
        ? theme.__cssMap[key].varRef
        : value

    transformed = withoutImportant(transformed)

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
