import { Dict, isArray, isFunction } from "@chakra-ui/utils"
import { createProcessor } from "./create-processor"
import { get } from "./get"
import { ConfigObject, transformConfig } from "./transform-config"

const fallbackBreakpoints = { sm: 400, md: 700, lg: 1000 }

export function createParser(configs: ConfigObject) {
  const cache: Dict = {}

  const parser = (props: Dict) => {
    cache.breakpoints =
      cache.breakpoints || get(props.theme, "breakpoints", fallbackBreakpoints)

    const processor = createProcessor(cache.breakpoints)
    const resolvedConfig = transformConfig(configs, props.theme)

    Object.keys(props).forEach(prop => {
      // no need to process if prop is theme, or there's no configs for this prop
      if (prop === "theme" || configs[prop] == null) return

      const valueOrFn = props[prop]
      const value = isFunction(valueOrFn) ? valueOrFn(props.theme) : valueOrFn

      const config = resolvedConfig[prop]

      if (isArray(config)) {
        config.forEach((config: any) => {
          processor.apply({ ...config, value })
        })
      } else {
        processor.apply({ ...config, value })
      }
    })

    return processor.value()
  }

  parser.config = configs
  parser.propNames = Object.keys(configs)

  return parser
}

export type Parser = ReturnType<typeof createParser>
