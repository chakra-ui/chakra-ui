import * as CSS from "csstype"
import { system, Config } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

const config: Config = {
  transform: true,
  transformOrigin: true,
}

export interface TransformProps {
  /**
   * The CSS `transform` property
   */
  transform?: ResponsiveValue<CSS.TransformProperty>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: ResponsiveValue<CSS.TransformOriginProperty<Length>>
}

export const transform = system(config)
