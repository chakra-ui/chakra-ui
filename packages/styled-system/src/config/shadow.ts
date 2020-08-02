import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { ResponsiveValue } from "../utils"

const config: Config = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows",
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows",
  },
}

/**
 * Types for box and text shadow properties
 */
export interface ShadowProps {
  /**
   * The `box-shadow` property
   */
  boxShadow?: ResponsiveValue<CSS.BoxShadowProperty | number>
  /**
   * The `box-shadow` property
   */
  shadow?: ResponsiveValue<CSS.BoxShadowProperty | number>
  /**
   * The `text-shadow` property
   */
  textShadow?: ResponsiveValue<CSS.TextShadowProperty | number>
}

export const shadow = system(config)
export const shadowParser = createParser(config)
