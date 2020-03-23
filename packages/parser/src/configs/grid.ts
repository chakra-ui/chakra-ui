import { createParser } from "../create-parser"
import { ConfigObject } from "../utils/transform-config"

const defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}

const config: ConfigObject = {
  gridGap: {
    property: "gridGap",
    scale: "space",
    fallbackScale: defaults.space,
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space",
    fallbackScale: defaults.space,
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space",
    fallbackScale: defaults.space,
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true,
}

export const grid = createParser(config)
