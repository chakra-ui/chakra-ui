import { compose, getWithDefault } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { PropConfig } from "../core"
import { Directionality } from "./directionality"

type CSSProp = keyof CSS.Properties

interface LogicalTransformOptions<T> {
  ltr: T | T[]
  rtl: T | T[]
  transform?: PropConfig["transform"]
}

/**
 * Polyfill for border-{start|end}-radius properties.
 * We'll remove this once css logical properties is supported in major browsers
 */
function logicalTransform<T extends CSSProp>(opts: LogicalTransformOptions<T>) {
  const { transform, ltr, rtl } = opts

  const rtlTransform: PropConfig["transform"] = (value, scale, props) => {
    const directional = new Directionality(props)
    const raw = getWithDefault(value, scale)
    return directional.getLogicalStyle({ rtl, ltr, value: raw })
  }

  return transform ? compose(transform, rtlTransform) : rtlTransform
}

interface LogicalOptions<T> {
  scale?: string
  property: { ltr: T | T[]; rtl: T | T[] }
  transform?: PropConfig["transform"]
}

export function logical<T extends CSSProp>(
  opts: LogicalOptions<T>,
): PropConfig {
  const { property, scale, transform } = opts
  return {
    property: "&",
    scale,
    transform: logicalTransform({
      ...property,
      transform,
    }),
  }
}
