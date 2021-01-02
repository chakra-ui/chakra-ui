import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { ResponsiveValue, t } from "../utils"
import { ThemeTypings } from ".."

const config: Config = {
  color: t.colors("color"),
  textColor: t.colors("color"),
  opacity: true,
  fill: t.colors("fill"),
  stroke: t.colors("stroke"),
}

export interface ColorProps<Theme extends ThemeTypings = ThemeTypings> {
  /**
   * The CSS `color` property
   */
  textColor?: ResponsiveValue<Theme["colors"]>
  /**
   * The CSS `color` property
   */
  color?: ResponsiveValue<Theme["colors"] | CSS.Property.Color>
  /**
   * The CSS `fill` property for icon svgs and paths
   */
  fill?: ResponsiveValue<Theme["colors"] | CSS.Property.Color>
  /**
   * The CSS `stroke` property for icon svgs and paths
   */
  stroke?: ResponsiveValue<Theme["colors"] | CSS.Property.Color>
  /**
   * The CSS `opacity` property
   */
  opacity?: ResponsiveValue<CSS.Property.Opacity>
}

export const color = system(config)
export const colorParser = createParser(config)
