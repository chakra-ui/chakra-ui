import { createParser } from "../create-parser"
import { ConfigObject } from "../transform-config"

const config: ConfigObject = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes",
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection",
  },
}

export const flexbox = createParser(config)
