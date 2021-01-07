import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { ResponsiveValue, t } from "../utils"
import { ThemeTypings } from "../theming.types"

const config: Config = {
  boxShadow: t.shadows("boxShadow"),
  textShadow: t.shadows("textShadow"),
}

Object.assign(config, {
  shadow: config.boxShadow,
})

/**
 * Types for box and text shadow properties
 */
export interface ShadowProps {
  /**
   * The `box-shadow` property
   */
  boxShadow?: ResponsiveValue<
    ThemeTypings["shadows"] | CSS.Property.BoxShadow | number
  >
  /**
   * The `box-shadow` property
   */
  shadow?: ResponsiveValue<
    ThemeTypings["shadows"] | CSS.Property.BoxShadow | number
  >
  /**
   * The `text-shadow` property
   */
  textShadow?: ResponsiveValue<
    ThemeTypings["shadows"] | CSS.Property.TextShadow | number
  >
}

export const shadow = system(config)
export const shadowParser = createParser(config)
