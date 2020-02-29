import { createParser, Parser } from "./create-parser"
import { Dict } from "@chakra-ui/utils"

export function combineParsers(...parsers: Parser[]) {
  let config: Dict = {}

  parsers.forEach(parser => {
    if (!parser || !parser.config) return
    config = { ...config, ...parser.config }
  })

  const parser = createParser(config)
  parser.config = config
  parser.propNames = Object.keys(config)

  return parser
}
