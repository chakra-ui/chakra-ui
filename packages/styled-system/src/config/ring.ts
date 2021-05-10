import * as CSS from "csstype"
import { Length, t, Token, transforms } from "../utils"
import { Config } from "../utils/prop-config"

const ringTemplates = {
  "--chakra-ring-offset-shadow": `var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)`,
  "--chakra-ring-shadow": `var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)`,
  "box-shadow": [
    `var(--chakra-ring-offset-shadow)`,
    `var(--chakra-ring-shadow)`,
    `var(--chakra-shadow, 0 0 #0000)`,
  ].join(", "),
}

/**
 * The parser configuration for common outline properties
 */
export const ring: Config = {
  ring: {
    static: ringTemplates,
    transform: (value) => ({
      "--chakra-ring-width": transforms.px(value),
    }),
  },
  ringColor: t.colors("--chakra-ring-color"),
  ringOffset: t.prop("--chakra-ring-offset-width"),
  ringOffsetColor: t.colors("--chakra-ring-offset-color"),
  ringInset: t.prop("--chakra-ring-inset"),
}

export interface RingProps {
  /**
   * Creates outline rings with CSS `box-shadow` property
   */
  ring?: Token<Length>
  /**
   * The color of the outline ring
   */
  ringColor?: Token<CSS.Property.Color, "colors">
  /**
   * The thickness of the offset shadow when using outline rings
   */
  ringOffset?: Token<Length>
  /**
   * The color of the offset shadow when adding outline rings
   */
  ringOffsetColor?: Token<CSS.Property.Color, "colors">
  /**
   * If the outline ring should an `inset`
   */
  ringInset?: Token<"inset" | "none">
}
