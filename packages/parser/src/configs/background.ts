import { createParser } from "../create-parser"
import { ConfigObject } from "../transform-config"

const config: ConfigObject = {
  background: true,
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
  bgPos: {
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
