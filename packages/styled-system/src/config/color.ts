import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { ResponsiveValue } from "../utils"

/**
 * The parser configuration for common border properties
 */
const config: Config = {
  color: {
    property: "color",
    scale: "colors",
  },
  textColor: {
    property: "color",
    scale: "colors",
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
}

export interface ColorProps {
  /**
   * The CSS `color` property
   */
  textColor?: ResponsiveValue<CSS.ColorProperty>
  /**
   * The CSS `color` property
   */
  color?: ResponsiveValue<CSS.ColorProperty>
  /**
   * The CSS `fill` property for icon svgs and paths
   */
  fill?: ResponsiveValue<CSS.ColorProperty>
  /**
   * The CSS `stroke` property for icon svgs and paths
   */
  stroke?: ResponsiveValue<CSS.ColorProperty>
  /**
   * The CSS `opacity` property
   */
  opacity?: ResponsiveValue<CSS.GlobalsNumber>
}

export const color = system(config)
export const colorParser = createParser(config)
