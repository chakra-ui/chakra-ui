import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"

const config: ConfigObject = {
  color: {
    property: "color",
    scale: "colors",
  },
  textColor: {
    property: "color",
    scale: "colors",
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors",
  },
}

export const color = createParser(config)
export default color
