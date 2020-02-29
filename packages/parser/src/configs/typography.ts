import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"

const defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

const config: ConfigObject = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts",
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes",
    fallbackScale: defaults.fontSizes,
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights",
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights",
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings",
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: { property: "textDecoration" },
  textDecor: { property: "textDecoration" },
}

export const typography = createParser(config)
export default typography
