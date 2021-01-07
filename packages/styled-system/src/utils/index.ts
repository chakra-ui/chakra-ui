import { get, isNumber } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { PropConfig } from "../core"
import { logical } from "./logical-prop"
import { positiveOrNegative } from "./positive-or-negative"

export * from "./positive-or-negative"
export * from "./sort"
export * from "./types"
export * from "./logical-prop"

type CSSProp = keyof CSS.Properties

export function makeConfig(scale: string, transform?: PropConfig["transform"]) {
  return <T extends CSSProp>(prop: T | T[]) => {
    const result: PropConfig = { scale }
    if (transform) result.transform = transform
    if (Array.isArray(prop)) result.properties = prop
    else result.property = prop
    return result
  }
}

function fractionalValue(value: any, scale: any) {
  const defaultValue = !isNumber(value) || value > 1 ? value : `${value * 100}%`
  return get(scale, value, defaultValue)
}

export const t = {
  borderWidths: makeConfig("borderWidths"),
  borderStyles: makeConfig("borderStyles"),
  colors: makeConfig("colors"),
  borders: makeConfig("borders"),
  radii: makeConfig("radii"),
  space: makeConfig("space"),
  spaceT: makeConfig("space", positiveOrNegative),
  prop: (property: CSSProp, transform?: PropConfig["transform"]) => ({
    property,
    transform,
  }),
  sizes: makeConfig("sizes"),
  sizesT: makeConfig("sizes", fractionalValue),
  shadows: makeConfig("shadows"),
  logical,
}
