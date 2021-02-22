import * as CSS from "csstype"
import { Config } from "../prop-config"
import { Length, ResponsiveValue, t } from "../utils"

/**
 * The parser configuration for common outline properties
 */
export const outline: Config = {
  outline: true,
  outlineOffset: true,
  outlineColor: t.colors("outlineColor"),
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
