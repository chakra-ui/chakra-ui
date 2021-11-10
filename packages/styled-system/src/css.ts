import {
  Dict,
  isArray,
  isCustomBreakpoint,
  isObject,
  isResponsiveObjectLike,
  memoizedGet as get,
  mergeWith,
  objectToArrayNotation,
  runIfFn,
} from "@chakra-ui/utils"
import { CSSObject, StyleObjectOrFn } from "./types"
import { parser } from "./parser"
import { pseudoSelectors } from "./pseudo"

interface Cache {
  themeBreakpoints: string[]
  breakpoints: string[]
  breakpointValues: string[]
  mediaQueries: (string | null)[]
}

const cache: Cache = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: [],
}

interface BreakpointValueObj {
  /**
   * left side of a breakpoint object, the name, e.g. sm
   */
  breakpoints: string[]
  /**
   * right side of a breakpoint object, the size, e.g. 4
   */
  breakpointValues: string[]
}

/**
 *
 */
const calculateBreakpointAndMediaQueries = (
  themeBreakpoints: string[] = [],
) => {
  // caching here reduces execution time by factor 4-6x
  const isCached = cache.themeBreakpoints === themeBreakpoints

  if (isCached) {
    return cache
  }

  const { breakpoints, breakpointValues } = Object.entries(themeBreakpoints)
    .filter(([key]) => isCustomBreakpoint(key))
    .reduce<BreakpointValueObj>(
      (carry, [breakpoint, value]) => {
        carry.breakpoints.push(breakpoint)
        carry.breakpointValues.push(value)

        return carry
      },
      {
        breakpoints: [],
        breakpointValues: [],
      },
    )

  const mediaQueries = [
    null,
    ...breakpointValues
      .map((bp) => `@media screen and (min-width: ${bp})`)
      .slice(1),
  ]

  cache.themeBreakpoints = themeBreakpoints
  cache.mediaQueries = mediaQueries
  cache.breakpointValues = breakpointValues
  cache.breakpoints = breakpoints

  return {
    breakpoints,
    mediaQueries,
  }
}

export const processResponsive = (styles: any) => (theme: Dict) => {
  const computedStyles: any = {}

  const { breakpoints, mediaQueries } = calculateBreakpointAndMediaQueries(
    theme.breakpoints,
  )

  for (const key in styles) {
    let value = runIfFn(styles[key], theme)

    if (value == null) {
      continue
    }

    value = isResponsiveObjectLike(value, breakpoints)
      ? objectToArrayNotation(value, breakpoints)
      : value

    if (!isArray(value)) {
      computedStyles[key] = value
      continue
    }

    const queries = value.slice(0, mediaQueries.length).length

    for (let index = 0; index < queries; index += 1) {
      const media = mediaQueries[index]

      if (!media) {
        computedStyles[key] = value[index]
        continue
      }

      computedStyles[media] = computedStyles[media] || {}

      if (value[index] == null) {
        continue
      }

      computedStyles[media][key] = value[index]
    }
  }

  return computedStyles
}

type PropsOrTheme = Dict | { theme: Dict }

export const css = (styleOrFn: StyleObjectOrFn = {}) => (
  props: PropsOrTheme = {},
): CSSObject => {
  const theme = "theme" in props ? props.theme : props

  let computedStyles: CSSObject = {}

  const styleObject = runIfFn(styleOrFn, theme)
  const styles = processResponsive(styleObject)(theme)

  for (const k in styles) {
    const x = styles[k]
    const val = runIfFn(x, theme)

    const key = k in pseudoSelectors ? pseudoSelectors[k] : k
    let config = (parser.config as Dict)[key]

    if (config === true) {
      // shortcut definition
      config = { property: key, scale: key }
    }

    if (isObject(val)) {
      computedStyles[key] = css(val)(theme)
      continue
    }

    const scale = get(theme, config?.scale, {})
    let value = config?.transform?.(val, scale, props) ?? get(scale, val, val)
    /**
     * Useful for `layerStyle`, and `textStyle` to transform the returned
     * result since it might use theme tokens
     */
    value = config?.processResult ? css(value)(theme) : value

    if (config?.properties) {
      for (const property of config.properties) {
        computedStyles[property] = value
      }
      continue
    }

    if (config?.property) {
      /**
       * Used for styled-system configs that map to multiple computed properties.
       * For example, the `borderLeftRadius` computed keys based on rtl/ltr
       */
      if (config.property === "&") {
        computedStyles = mergeWith({}, computedStyles, value)
      } else {
        computedStyles[config.property] = value
      }
      continue
    }

    computedStyles[key] = value
  }

  return computedStyles
}
