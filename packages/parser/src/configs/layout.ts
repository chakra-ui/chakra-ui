import { get } from "../get"
import { isNumber } from "@chakra-ui/utils"
import { ConfigObject } from "../transform-config"
import { createParser } from "../create-parser"

function getWidth(n: any, scale: any) {
  return get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + "%")
}

const config: ConfigObject = {
  width: {
    property: "width",
    scale: "sizes",
    transform: getWidth,
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: getWidth,
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
export default layout
