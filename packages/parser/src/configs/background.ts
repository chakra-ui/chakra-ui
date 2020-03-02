import { createParser } from "../create-parser"
import { ConfigObject } from "../transform-config"

const config: ConfigObject = {
  bg: {
    property: "background",
    scale: "colors",
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  background: {
    property: "background",
    scale: "colors",
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  bgImage: {
    property: "backgroundImage",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPosition: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  bgAttachment: {
    property: "backgroundAttachment",
  },
}

export const background = createParser(config)

export default background
