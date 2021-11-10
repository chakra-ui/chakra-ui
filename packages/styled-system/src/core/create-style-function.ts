import { Dict, getWithDefault } from "@chakra-ui/utils"
import { StyleFunction, PropConfig } from "./types"

export function createStyleFunction(config: PropConfig) {
  const { property, scale, transform = getWithDefault, defaultScale } = config

  const properties = config.properties || [property]

  const styleFunction: StyleFunction = (value, scale, props) => {
    const result: Dict = {}
    const rawValue = transform(value, scale, props)

    if (rawValue === null) return

    properties.forEach((prop: any) => {
      result[prop] = rawValue
    })

    return result
  }
  styleFunction.scale = scale
  styleFunction.defaults = defaultScale
  return styleFunction
}
