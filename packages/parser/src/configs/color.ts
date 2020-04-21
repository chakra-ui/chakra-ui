import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Prop } from "../utils"

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
  textColor?: Prop<CSS.ColorProperty>
  /**
   * The CSS `color` property
   */
  color?: Prop<CSS.ColorProperty>
  /**
   * The CSS `fill` property for icon svgs and paths
   */
  fill?: Prop<CSS.ColorProperty>
  /**
   * The CSS `stroke` property for icon svgs and paths
   */
  stroke?: Prop<CSS.ColorProperty>
  /**
   * The CSS `opacity` property
   */
  opacity?: Prop<CSS.GlobalsNumber>
}

export const color = createParser(config)
