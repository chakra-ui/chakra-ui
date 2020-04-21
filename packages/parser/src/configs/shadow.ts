import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Prop } from "../utils"

const config: Config = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textShadow: {
    property: "textShadow",
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
  boxShadow?: Prop<CSS.BoxShadowProperty | number>
  /**
   * The `text-shadow` property
   */
  textShadow?: Prop<CSS.BoxShadowProperty | number>
}

export const shadow = createParser(config)
