import { ConfigObject } from "../utils/transform-config"
import { createParser } from "../create-parser"
import { positiveOrNegative } from "../utils/positive-or-negative"

const common = {
  fallbackScale: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  transform: positiveOrNegative,
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
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    ...common,
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    ...common,
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    ...common,
  },

  top: {
    property: "top",
    scale: "space",
    ...common,
  },
  right: {
    property: "right",
    scale: "space",
    ...common,
  },
  bottom: {
    property: "bottom",
    scale: "space",
    ...common,
  },
  left: {
    property: "left",
    scale: "space",
    ...common,
  },
}

export const position = createParser(config)
