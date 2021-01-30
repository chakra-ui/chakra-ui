import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { t, Token } from "../utils"

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
  boxShadow?: Token<CSS.Property.BoxShadow | number, "shadows">
  /**
   * The `box-shadow` property
   */
  shadow?: Token<CSS.Property.BoxShadow | number, "shadows">
  /**
   * The `text-shadow` property
   */
  textShadow?: Token<CSS.Property.TextShadow | number, "shadows">
}

export const shadow = system(config)
export const shadowParser = createParser(config)
