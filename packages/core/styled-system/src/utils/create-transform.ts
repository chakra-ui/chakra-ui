import { isObject } from "@chakra-ui/shared-utils"
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
    /**
     *  For shorthand props that contain multiple like values
     *
     * i.e. `margin="4 3rem"` with `4` being valued as a token
     */
    let valArray: string[] = []
    if (typeof value === "string") {
      valArray = value.split(" ")
    }

    let _value = ""

    /**
     * Constrain the check to run a reduction only if:
     * 1. there is more than one value split into the array
     * 2. it is for a prop that uses 'space' tokens
     *
     * Else, handle the value as usual
     */
    if (valArray.length > 1 && scale === "space") {
      _value = valArray.reduce((prevVal, currVal) => {
        const convertedVaL = tokenToCSSVar(scale, currVal)(theme)

        return (prevVal + " " + convertedVaL).trim()
      }, "")
    } else {
      _value = tokenToCSSVar(scale, value)(theme)
    }

    let result = transform?.(_value, theme) ?? _value
    if (compose) {
      result = compose(result, theme)
    }
    return result
  }

  return fn
}
