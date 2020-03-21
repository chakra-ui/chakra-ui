import { createParser, Parser } from "./create-parser"

/**
 * Combine multiple style prop parsers
 * into a single parser.
 *
 * @param parsers list of parsers
 */
export function combineParsers(...parsers: Parser[]) {
  let config: Parser["config"] = {}

  for (const parser of parsers) {
    if (!parser || !parser.config) continue
    config = { ...config, ...parser.config }
  }

  const parser = createParser(config)
  parser.config = config
  parser.propNames = Object.keys(config)

  return parser
}
