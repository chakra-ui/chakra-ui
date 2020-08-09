import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

const config: Config = {
  transform: true,
  transformOrigin: true,
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.Property.Transform>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<CSS.Property.TransformOrigin<Length>>
}

export const transform = system(config)
export const transformParser = createParser(config)
