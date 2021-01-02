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
export interface ShadowProps<Theme extends ThemeTypings = ThemeTypings> {
  /**
   * The `box-shadow` property
   */
  boxShadow?: ResponsiveValue<
    Theme["shadows"] | CSS.Property.BoxShadow | number
  >
  /**
   * The `box-shadow` property
   */
  shadow?: ResponsiveValue<Theme["shadows"] | CSS.Property.BoxShadow | number>
  /**
   * The `text-shadow` property
   */
  textShadow?: ResponsiveValue<
    Theme["shadows"] | CSS.Property.TextShadow | number
  >
}

export const shadow = system(config)
export const shadowParser = createParser(config)
