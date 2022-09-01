import type { ThemeScale } from "../create-theme-vars"
import { createTransform } from "./create-transform"
import { pipe } from "./pipe"
import { logical, PropConfig, toConfig } from "./prop-config"
import { transformFunctions as transforms } from "./transform-functions"

export { transforms }

export * from "./types"

export const t = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii", transforms.px),
  space: toConfig("space", pipe(transforms.vh, transforms.px)),
  spaceT: toConfig("space", pipe(transforms.vh, transforms.px)),
  degreeT(property: PropConfig["property"]) {
    return { property, transform: transforms.degree }
  },
  prop(
    property: PropConfig["property"],
    scale?: ThemeScale,
    transform?: PropConfig["transform"],
  ) {
    return {
      property,
      scale,
      ...(scale && {
        transform: createTransform({ scale, transform }),
      }),
    }
  },
  propT(property: PropConfig["property"], transform?: PropConfig["transform"]) {
    return { property, transform }
  },
  sizes: toConfig("sizes", pipe(transforms.vh, transforms.px)),
  sizesT: toConfig("sizes", pipe(transforms.vh, transforms.fraction)),
  shadows: toConfig("shadows"),
  logical,
  blur: toConfig("blur", transforms.blur),
}
