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

/** Normalize recipe props (array → breakpoint) without rewriting CSS shorthand keys. */
export function createNormalizePropsFn(context: {
  normalize: SystemContext["normalizeValue"]
}) {
  const { normalize } = context

  return function (props: Dict) {
    return walkObject(props, normalize, {
      stop: (value) => Array.isArray(value),
    })
  }
}
