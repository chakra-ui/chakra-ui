import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Length, ResponsiveValue } from "../utils"

/**
 * The parser configuration for common outline properties
 */
const config: Config = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors",
  },
}

export interface OutlineProps {
  /**
   * The CSS `outline` property
   */
  outline?: ResponsiveValue<CSS.OutlineProperty<Length>>
  /**
   * The CSS `outline-offset` property
   */
  outlineOffset?: ResponsiveValue<CSS.OutlineOffsetProperty<Length>>
  /**
   * The CSS `outline-color` property
   */
  outlineColor?: ResponsiveValue<CSS.OutlineColorProperty>
}

export const outline = createParser(config)
