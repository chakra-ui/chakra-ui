import { Properties } from "csstype"
import merge from "lodash.mergewith"
import { createParser } from "./create-parser"
import { createStyleFunction } from "./create-style-function"
import { Config, Parser, PropConfig } from "./types"

export function system<T extends PropConfig | Config>(configs: T): Parser {
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

  return createParser(config)
}

export function compose(...parsers: Parser[]): Parser {
  let config: Config = {}
  parsers.forEach((parser) => {
    if (!parser || !parser.config) return
    config = merge({}, config, parser.config)
  })
  const parser = createParser(config)
  return parser
}
