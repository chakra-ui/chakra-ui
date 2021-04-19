import { isNumber } from "@chakra-ui/utils"
import { createTransform, px as pxTransform } from "../create-transform"
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
  radii: toConfig("radii", pxTransform),
  space: toConfig("space", pxTransform),
  spaceT: toConfig("space", pxTransform),
  prop: (
    property: PropConfig["property"],
    scale?: ThemeScale,
    transform?: PropConfig["transform"],
  ) => ({
    property,
    scale,
    ...(scale && {
      transform: createTransform({
        scale,
        transform,
      }),
    }),
  }),
  sizes: toConfig("sizes", pxTransform),
  sizesT: toConfig("sizes", fractionalValue),
  shadows: toConfig("shadows"),
  logical,
}
