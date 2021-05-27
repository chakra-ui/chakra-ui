import { Dict } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { createTransform } from "./create-transform"
import { ThemeScale } from "../create-theme-vars"
import type { CssTheme, Transform } from "./types"

type CSSProp = keyof CSS.Properties | (string & {})
type MaybeArray<T> = T | T[]
type MaybeThemeFunction<T> = T | ((theme: CssTheme) => T)
type StringUnion<T> = T | (string & {})

export interface PropConfig {
  /**
   * This is useful for props that need to leverage CSS variables
   * Static styles to append to the computed styles.
   *
   * It does not get replicated if value is responsive or styles are nested.
   */
  static?: Dict
  /**
   * The theme scale this maps to
   */
  scale?: ThemeScale
  /**
   * Css property or Css variable the prop maps to
   */
  property?: MaybeThemeFunction<MaybeArray<StringUnion<CSSProp>>>
  /**
   * Function to transform the value passed
   */
  transform?: Transform
  /**
   * Useful for `layerStyle`, tex`tStyles and `apply` where their
   * transform function returns theme aware styles
   */
  processResult?: boolean
}

export type Config = Record<string, PropConfig | true>

export function toConfig(scale: ThemeScale, transform?: Transform) {
  return <T extends CSSProp>(property: T | T[]) => {
    const result: PropConfig = { property, scale }
    result.transform = createTransform({
      scale,
      transform,
    })
    return result
  }
}

interface Opts {
  scale?: ThemeScale
  property: { ltr: MaybeArray<CSSProp>; rtl: MaybeArray<CSSProp> }
  transform?: Transform
}

const getRtl = ({ rtl, ltr }: Opts["property"]) => (theme: Dict) =>
  theme.direction === "rtl" ? rtl : ltr

export function logical(options: Opts): PropConfig {
  const { property, scale, transform } = options
  return {
    scale,
    property: getRtl(property),
    transform: scale
      ? createTransform({
          scale,
          compose: transform,
        })
      : transform,
  }
}
