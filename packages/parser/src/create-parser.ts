import { Dict, isArray, runIfFn, get } from "@chakra-ui/utils"
import { createProcessor } from "./create-processor"
import { ConfigObject, transformConfig } from "./transform-config"

const fallbackBreakpoints = { sm: 400, md: 700, lg: 1000 }

export function createParser(configs: ConfigObject) {
  const cache: Dict = {}

  const parser = (props: Dict) => {
    /**
     * Get the breakpoints from theme or cache
     */
    cache.breakpoints =
      cache.breakpoints || get(props.theme, "breakpoints", fallbackBreakpoints)

    /**
     * Create a style processor based on the breakpoints
     */
    const processor = createProcessor(cache.breakpoints)

    const allConfigs = transformConfig(configs, props.theme)

    for (const prop in props) {
      /**
       * No need to process if prop is theme, or there's no configs for this prop
       */
      if (prop === "theme" || configs[prop] == null) continue

      const valueOrFn = props[prop]
      const value = runIfFn(valueOrFn, props.theme)

      /**
       * Get the config for the style prop
       */
      const config = allConfigs[prop]

      /**
       * Apply each config to get the generate style object.
       *
       * If it's an array config:
       *
       * @example
       * marginX = ["marginLeft", "marginRight"]
       *
       * We'll apply `marginLeft`, and then `marginRight`
       */
      if (isArray(config)) {
        config.forEach((propConfig: any) => {
          processor.apply({ ...propConfig, value })
        })
      } else {
        processor.apply({ ...config, value })
      }
    }

    return processor.value()
  }

  parser.config = configs
  parser.propNames = Object.keys(configs)

  return parser
}

export type Parser = ReturnType<typeof createParser>
