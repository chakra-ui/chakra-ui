import { type Dict, walkObject } from "../utils"
import { type SystemContext } from "./types"

export function createNormalizeFn(context: {
  utility: SystemContext["utility"]
  normalize: SystemContext["normalizeValue"]
}) {
  const { utility, normalize } = context
  const { hasShorthand, resolveShorthand } = utility

  return function (styles: Dict) {
    return walkObject(styles, normalize, {
      stop: (value) => Array.isArray(value),
      getKey: hasShorthand ? resolveShorthand : undefined,
    })
  }
}
