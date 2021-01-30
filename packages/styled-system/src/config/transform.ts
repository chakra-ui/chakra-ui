import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Token } from "../utils"

const config: Config = {
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

export const transform = system(config)
export const transformParser = createParser(config)
