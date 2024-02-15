import { isObject } from "@chakra-ui/utils/is"
import type { ThemeScale } from "../create-theme-vars"
import type { Transform } from "./types"

interface CreateTransformOptions {
  scale: ThemeScale
  compose?: Transform
  transform?: Transform
}

const isImportant = (value: string) => /!(important)?$/.test(value)

const withoutImportant = (value: string | number) =>
  typeof value === "string" ? value.replace(/!(important)?$/, "").trim() : value

const withOpacity = (value: string | number) =>
  typeof value === "string" ? /^.+\/[0-9]+$/.test(value) : value

export const tokenToCSSVar =
  (scale: ThemeScale, value: any) => (theme: Record<string, any>) => {
    const valueStr = String(value)
    const important = isImportant(valueStr)
    let parsedValue = withoutImportant(valueStr)

    let opacity
    if (scale === "colors" && withOpacity(value)) {
      const [tokenValue, opacityValue] = value.split("/")
      parsedValue = tokenValue
      opacity = Math.max(Math.min(parseInt(opacityValue), 100), 0)
    }

    const key = scale ? `${scale}.${parsedValue}` : parsedValue

    let transformed =
      isObject(theme.__cssMap) && key in theme.__cssMap
        ? theme.__cssMap[key].varRef
        : value

    transformed = withoutImportant(transformed)

    if (opacity) {
      transformed = `color-mix(in srgb, ${transformed} ${opacity}%, transparent)`
    }

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
