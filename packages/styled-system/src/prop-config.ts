import { Dict, isArray } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { Token } from "./css-var"
import type { Theme, Transform } from "./types"
import { createTransform } from "./create-transform"

type CSSProp = keyof CSS.Properties
type MaybeArray<T> = T | T[]
type StringUnion<T> = T | (string & {})

export interface PropConfig {
  /**
   * This is useful for props that need to leverage CSS variables
   * Static styles to append to the computed styles.
   *
   * It does not get replicated if value is responsive or styles are nested.
   */
  static?: CSS.Properties
  /**
   * The theme scale this maps to
   */
  scale?: Token
  /**
   * Css property or Css variable the prop maps to
   */
  property?: MaybeArray<StringUnion<CSSProp>>
  /**
   * Function to transform the value passed
   */
  transform?: Transform
  /**
   * Useful for `layerStyle`, tex`tStyles and `apply` where their
   * transform function returns theme aware styles
   */
  returnsThemeAwareStyles?: boolean
}

export type Config = Record<string, PropConfig | true>

export function toConfig(scale: Token, transform?: Transform) {
  return <T extends CSSProp>(property: T | T[]) => {
    const result: PropConfig = { property, scale }
    if (transform) {
      result.transform = createTransform({
        scale,
        transform,
      })
    }
    return result
  }
}

interface LogicalOptions {
  ltr: MaybeArray<CSSProp>
  rtl: MaybeArray<CSSProp>
  compose?: Transform
}

export const rtl = (options: LogicalOptions) => (
  value: string | number | true,
  theme: Theme,
) => {
  const { ltr, rtl, compose } = options
  const result = {} as Dict
  const dir = theme.direction === "rtl" ? rtl : ltr
  if (isArray(dir)) {
    dir.forEach((prop) => {
      result[prop] = compose?.(value, theme) ?? value
    })
  } else {
    result[dir] = compose?.(value, theme) ?? value
  }
  return result
}

interface Opts {
  scale?: Token
  property: { ltr: MaybeArray<CSSProp>; rtl: MaybeArray<CSSProp> }
  transform?: Transform
}

export function logical(opts: Opts): PropConfig {
  const { property, scale, transform } = opts
  return {
    scale,
    transform: rtl({
      ...property,
      compose: transform,
    }),
  }
}
