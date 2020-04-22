import { Dict, isArray, runIfFn, get } from "@chakra-ui/utils"
import { createProcessor } from "./create-processor"
import { SystemProps } from "./parser.types"
import { Config, transformConfig } from "./utils"

const fallbackBreakpoints = { sm: 400, md: 700, lg: 1000 }

type ParserProps<P> = SystemProps & { theme: Dict } & P

export function createParser(styleConfig: Config) {
  const cache: { breakpoints?: Dict } = {}

  const parser = <P = {}>(props: ParserProps<P>) => {
    /**
     * Get the breakpoints from theme or cache
     */
    cache.breakpoints =
      cache.breakpoints ?? get(props.theme, "breakpoints", fallbackBreakpoints)

    /**
     * Create a style processor based on the breakpoints
     */
    const processor = createProcessor(cache.breakpoints as Dict)

    const _config = transformConfig(styleConfig, props.theme)

    for (const prop in props) {
      /**
       * No need to process if prop is `theme`, or there's no config for prop
       */
      if (prop === "theme" || styleConfig[prop] == null) continue

      const valueOrFn = props[prop as keyof typeof props]
      const value = runIfFn(valueOrFn, props.theme)

      /**
       * Get the config for the style prop
       */
      const config = _config[prop]

      /**
       * Apply each prop's config to get the generate style object.
       *
       * If it's an array config:
       *
       * @example
       * marginX = ["marginLeft", "marginRight"]
       *
       * We'll expand it to `marginLeft` and `marginRight`
       */
      if (isArray(config)) {
        config.forEach((opt: any) => {
          processor.apply({ ...opt, value, props })
        })
      } else {
        const options = { ...config, value, props }
        processor.apply(options)
      }
    }

    return processor.value()
  }

  parser.config = styleConfig
  parser.propNames = Object.keys(styleConfig)

  return parser
}

export type Parser = ReturnType<typeof createParser>
