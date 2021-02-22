import * as CSS from "csstype"
import { Config } from "../prop-config"
import { Token } from "../utils"

export const transform: Config = {
  transform: true,
  transformOrigin: true,
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: Token<CSS.Property.Transform>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: Token<CSS.Property.TransformOrigin | number, "sizes">
}
