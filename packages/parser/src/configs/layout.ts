import { isNumber, get } from "@chakra-ui/utils"
import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"

function transform(value: any, scale: any) {
  const defaultValue = !isNumber(value) || value > 1 ? value : value * 100 + "%"
  return get(scale, value, defaultValue)
}

const config: ConfigObject = {
  width: {
    property: "width",
    scale: "sizes",
    transform,
  },
  w: {
    property: "width",
    scale: "sizes",
    transform,
  },
  height: {
    property: "height",
    scale: "sizes",
  },
  h: {
    property: "height",
    scale: "sizes",
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes",
  },
  minW: {
    property: "minWidth",
    scale: "sizes",
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes",
  },
  minH: {
    property: "minHeight",
    scale: "sizes",
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes",
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes",
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes",
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes",
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
}

export const layout = createParser(config)
