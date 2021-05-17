import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { t, Token } from "../utils"

export const color: Config = {
  color: t.colors("color"),
  textColor: t.colors("color"),
  fill: t.colors("fill"),
  stroke: t.colors("stroke"),
}

export interface ColorProps {
  /**
   * The CSS `color` property
   */
  textColor?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `color` property
   */
  color?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `fill` property for icon svgs and paths
   */
  fill?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `stroke` property for icon svgs and paths
   */
  stroke?: Token<CSS.Property.Color, "colors">
}
