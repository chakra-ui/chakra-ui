import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"

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
  },
  right: {
    property: "right",
    scale: "space",
    fallbackScale: defaults.space,
  },
  bottom: {
    property: "bottom",
    scale: "space",
    fallbackScale: defaults.space,
  },
  left: {
    property: "left",
    scale: "space",
    fallbackScale: defaults.space,
  },
}

export const position = createParser(config)

export default position
