import { isNumber } from "@chakra-ui/utils"
import { createTransform } from "../create-transform"
import type { ThemeScale } from "../css-var"
import { logical, PropConfig, toConfig } from "../prop-config"

export * from "./types"

function fractionalValue(value: any) {
  return !isNumber(value) || value > 1 ? value : `${value * 100}%`
}

export const t = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii"),
  space: toConfig("space"),
  spaceT: toConfig("space"),
  prop: (property: PropConfig["property"], scale?: ThemeScale) => ({
    property,
    scale,
    ...(scale && { transform: createTransform({ scale }) }),
  }),
  sizes: toConfig("sizes"),
  sizesT: toConfig("sizes", fractionalValue),
  shadows: toConfig("shadows"),
  logical,
}
