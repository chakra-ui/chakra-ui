import { Properties } from "csstype"
import merge from "lodash.mergewith"
import { createParser, Parser } from "./create-parser"
import { createStyleFunction } from "./create-style-function"
import { Config } from "./types"

export function system(configs: Config = {}) {
  const config: Config = {}

  Object.keys(configs).forEach((key) => {
    const propConfig = configs[key]

    if (propConfig === true) {
      config[key] = createStyleFunction({
        property: key as keyof Properties,
        scale: key,
      })
      return
    }

    if (typeof propConfig === "function") {
      config[key] = propConfig
      return
    }

    config[key] = createStyleFunction(propConfig)
  })

  const parser = createParser(config)
  return parser
}

export function compose(...parsers: Parser[]) {
  let config: Config = {}
  parsers.forEach((parser) => {
    if (!parser || !parser.config) return
    config = merge({}, config, parser.config)
  })
  const parser = createParser(config)
  return parser
}
