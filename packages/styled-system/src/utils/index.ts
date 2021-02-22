import { get, isNumber, isObject } from "@chakra-ui/utils"
import * as CSS from "csstype"
// import { positiveOrNegative } from "./positive-or-negative"
import { logical, PropConfig, toConfig } from "../prop-config"

// export * from "./positive-or-negative"
export * from "./logical-prop"
export * from "./sort"
export * from "./types"

function fractionalValue(value: any, scale: any) {
  const defaultValue = !isNumber(value) || value > 1 ? value : `${value * 100}%`
  return get(scale, value, defaultValue)
}

function positiveOrNegative(value: any) {
  console.log({ value })
  return value
}

export const t = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii"),
  space: toConfig("space"),
  spaceT: toConfig("space", positiveOrNegative),
  prop: (
    property: keyof CSS.Properties,
    transform?: PropConfig["transform"],
  ) => ({
    property,
    transform,
  }),
  sizes: toConfig("sizes"),
  sizesT: toConfig("sizes", fractionalValue),
  shadows: toConfig("shadows"),
  logical,
}
