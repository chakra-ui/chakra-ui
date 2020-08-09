import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

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
  outline?: ResponsiveValue<CSS.Property.Outline<Length>>
  /**
   * The CSS `outline-offset` property
   */
  outlineOffset?: ResponsiveValue<CSS.Property.OutlineOffset<Length>>
  /**
   * The CSS `outline-color` property
   */
  outlineColor?: ResponsiveValue<CSS.Property.OutlineColor>
}

export const outline = system(config)
export const outlineParser = createParser(config)
