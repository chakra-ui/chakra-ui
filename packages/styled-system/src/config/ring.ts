import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { t, Token } from "../utils"

/**
 * The parser configuration for common outline properties
 */
export const ring: Config = {
  ringColor: t.prop("--chakra-ring-color", "colors"),
  ringOffsetWidth: t.prop("--chakra-ring-offset"),
  ringOffsetColor: t.prop("--chakra-ring-offset-color", "colors"),
  ringWidth: t.prop("--chakra-ring-offset"),
  ringInset: t.prop("--chakra-ring-inset"),
}

export interface RingProps {
  /**
   * The color of the outline ring
   */
  ringColor?: Token<CSS.Property.Color, "colors">
  /**
   * The thickness of the offset shadow when using outline rings
   */
  ringOffsetWidth?: Token<CSS.Property.OutlineOffset>
  /**
   * The color of the offset shadow when adding outline rings
   */
  ringOffsetColor?: Token<CSS.Property.Color, "colors">
  /**
   * The thickness of the outline rings
   */
  ringWidth?: Token<CSS.Property.OutlineWidth>
  /**
   * If the outline ring should an `inset`
   */
  ringInset?: "inset"
}
