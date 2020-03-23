import { ConfigObject } from "../utils/transform-config"
import { createParser } from "../create-parser"

const config: ConfigObject = {
  border: {
    property: "border",
    scale: "borders",
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths",
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles",
  },
  borderColor: {
    property: "borderColor",
    scale: "colors",
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii",
  },
  borderTop: {
    property: "borderTop",
    scale: "borders",
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
  },
  borderRight: {
    property: "borderRight",
    scale: "borders",
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders",
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii",
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders",
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders",
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders",
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths",
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles",
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths",
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles",
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths",
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles",
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths",
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles",
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
}

export const border = createParser(config)
