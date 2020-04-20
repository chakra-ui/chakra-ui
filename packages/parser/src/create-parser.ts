import { Dict, isArray, runIfFn, get } from "@chakra-ui/utils"
import { createProcessor } from "./create-processor"
import { Config, transformConfig } from "./utils"
import { SystemProps } from "./parser.types"

const fallbackBreakpoints = { sm: 400, md: 700, lg: 1000 }

export function createParser(styleConfig: Config) {
  const cache: { breakpoints?: Dict } = {}

  const parser = <P = {}>(props: SystemProps & { theme: Dict } & P) => {
    /**
     * Get the breakpoints from theme or cache
     */
    cache.breakpoints =
      cache.breakpoints || get(props.theme, "breakpoints", fallbackBreakpoints)

    /**
     * Create a style processor based on the breakpoints
     */
    const processor = createProcessor(cache.breakpoints as Dict)

    const allConfigs = transformConfig(styleConfig, props.theme)

    for (const prop in props) {
      /**
       * No need to process if prop is theme, or there's no configs for this prop
       */
      if (prop === "theme" || styleConfig[prop] == null) continue

      const valueOrFn = props[prop as keyof typeof props]
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
          processor.apply({ ...propConfig, value, props })
        })
      } else {
        processor.apply({ ...config, value, props })
      }
    }

    return processor.value()
  }

  parser.config = styleConfig
  parser.propNames = Object.keys(styleConfig)

  return parser
}

export type Parser = ReturnType<typeof createParser>
