import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"
import { positiveOrNegative } from "../positive-or-negative"

const defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}

const config: ConfigObject = {
  position: true,
  pos: {
    property: "position",
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices",
  },
  top: {
    property: "top",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegative,
  },
  right: {
    property: "right",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegative,
  },
  bottom: {
    property: "bottom",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegative,
  },
  left: {
    property: "left",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegative,
  },
}

export const position = createParser(config)
