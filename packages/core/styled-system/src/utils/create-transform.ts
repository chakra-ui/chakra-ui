import { isObject } from "@chakra-ui/shared-utils"
import type { ThemeScale } from "../create-theme-vars"
import type { Transform } from "./types"
import { pseudoPropNames } from "../pseudos"

interface CreateTransformOptions {
  scale: ThemeScale
  compose?: Transform
  transform?: Transform
}

/**
 * Check for use of a prop in the semanticTokens object
 * That is not a pseudo but uses the underscore prefix.
 * Also only returns true if it is pascalCase.
 *
 * @example `_myClass` is true
 */
export const isCustomSelector = (key: string) =>
  !pseudoPropNames.includes(key as any) && key.match(/^_[a-z]+[A-Z]?[a-z]*$/)

const isImportant = (value: string) => /!(important)?$/.test(value)

const withoutImportant = (value: string | number) =>
  typeof value === "string" ? value.replace(/!(important)?$/, "").trim() : value

export const tokenToCSSVar =
  (scale: ThemeScale, value: any) => (theme: Record<string, any>) => {
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
