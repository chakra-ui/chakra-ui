import { Dict, memoizedGet as get } from "@chakra-ui/utils"
import merge from "lodash.mergewith"
import { sort } from "../utils"
import {
  createMediaQuery,
  parseResponsiveArray,
  parseResponsiveObject,
} from "./parse-responsive"
import { PropConfig } from "./types"

const defaultBreakpoints = [40, 52, 64].map((n) => `${n}em`)

export function createParser(config: PropConfig) {
  const cache = new Map<string, any>()

  const parse = (props: Dict) => {
    let styles: Dict = {}
    let shouldSort = false
    const isCacheDisabled = props.theme?.config?.disableStyledSystemCache

    for (const prop in props) {
      if (!config[prop]) continue

      const styleFunction = config[prop]
      const value = props[prop]
      const theme = props.theme ?? {}

      const scale = get(theme, styleFunction.scale, styleFunction.defaults)

      if (typeof value === "object") {
        const bps =
          (!isCacheDisabled && cache.get("breakpoints")) ||
          get(theme, "breakpoints", defaultBreakpoints)

        cache.set("breakpoints", bps)

        if (Array.isArray(value)) {
          const bps = (!isCacheDisabled && cache.get("media")) || [
            null,
            ...cache.get("breakpoints").map(createMediaQuery),
          ]

          cache.set("media", bps)

          const style = parseResponsiveArray({
            mediaQueries: cache.get("media"),
            styleFunction,
            scale,
            value,
            props,
          })

          styles = merge(styles, style)
          continue
        }

        if (value !== null) {
          const style = parseResponsiveObject({
            breakpoints: cache.get("breakpoints"),
            styleFunction,
            scale,
            value,
            props,
          })
          styles = merge(styles, style)
          shouldSort = true
        }
        continue
      }
      styles = merge({}, styles, styleFunction(value, scale, props))
    }

    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles)
    }

    return styles
  }

  parse.config = config
  parse.propNames = Object.keys(config)
  parse.cache = cache

  const keys = Object.keys(config).filter((key) => key !== "config")

  if (keys.length > 1) {
    keys.forEach((key) => {
      parse[key] = createParser({ [key]: config[key] })
    })
  }

  return parse
}
