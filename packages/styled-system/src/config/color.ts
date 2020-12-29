import * as CSS from "csstype"
import { createParser, Config, system } from "../core"
import { ResponsiveValue, t } from "../utils"
import { ChakraTheme } from ".."
import { PropsPath } from "../utils.types"

const config: Config = {
  color: t.colors("color"),
  textColor: t.colors("color"),
  opacity: true,
  fill: t.colors("fill"),
  stroke: t.colors("stroke"),
}

export interface ColorProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * The CSS `color` property
   */
  textColor?: ResponsiveValue<CSS.Property.Color & PropsPath<Theme["colors"]>>
  /**
   * The CSS `color` property
   */
  color?: ResponsiveValue<CSS.Property.Color & PropsPath<Theme["colors"]>>
  /**
   * The CSS `fill` property for icon svgs and paths
   */
  fill?: ResponsiveValue<CSS.Property.Color & PropsPath<Theme["colors"]>>
  /**
   * The CSS `stroke` property for icon svgs and paths
   */
  stroke?: ResponsiveValue<CSS.Property.Color & PropsPath<Theme["colors"]>>
  /**
   * The CSS `opacity` property
   */
  opacity?: ResponsiveValue<CSS.Property.Opacity>
}

export const color = system(config)
export const colorParser = createParser(config)
