import {
  Dict,
  get,
  isArray,
  isObject,
  isResponsiveObjectLike,
  objectToArrayNotation,
  runIfFn,
  merge,
} from "@chakra-ui/utils"
import { pseudoSelectors } from "./pseudo"
import { parser } from "./parser"
import { StyleObjectOrFn, CSSObject } from "./css.types"

const getCustomBreakpoints = (breakpoints: string[]) =>
  Object.entries(breakpoints)
    .filter(([key]) => Number.isNaN(Number.parseInt(key)))
    .map((arr) => arr[1])

interface Cache {
  breakpoints: string[]
  customBreakpoints: ReturnType<typeof getCustomBreakpoints>
  mediaQueries: (string | null)[]
}

const cache: Cache = {
  breakpoints: [],
  customBreakpoints: [],
  mediaQueries: [],
}

const responsive = (styles: any) => (theme: Dict = {}) => {
  const computedStyles: any = {}

  // caching here reduces execution time by factor 4-6
  const isCached = cache.breakpoints === theme.breakpoints
  const breakpoints = isCached
    ? cache.customBreakpoints
    : getCustomBreakpoints(theme.breakpoints)

  const mediaQueries = isCached
    ? cache.mediaQueries
    : [
        null,
        ...breakpoints.map(
          (n: string) => `@media screen and (min-width: ${n})`,
        ),
      ]

  if (!isCached) {
    cache.breakpoints = theme.breakpoints
    cache.customBreakpoints = breakpoints
    cache.mediaQueries = mediaQueries
  }

  for (const key in styles) {
    let value = runIfFn(styles[key], theme)

    if (value == null) continue

    /**
     * @todo
     * Use breakpoints from the theme to check value is breakpoint-like
     * instead of using our hard-coded breakpoints.
     *
     * @tip
     * `isResponsiveObjectLike` takes a second arg called `breakpointsArr`,
     * you can simply pass the keys in `theme.breakpoints`
     */
    value = isResponsiveObjectLike(value) ? objectToArrayNotation(value) : value

    if (!isArray(value)) {
      computedStyles[key] = value
      continue
    }

    const queries = value.slice(0, mediaQueries.length).length

    for (let index = 0; index < queries; index++) {
      const media = mediaQueries[index]
      if (!media) {
        computedStyles[key] = value[index]
        continue
      }
      computedStyles[media] = computedStyles[media] || {}
      if (value[index] == null) continue
      computedStyles[media][key] = value[index]
    }
  }

  return computedStyles
}

type PropsOrTheme = Dict | { theme: Dict }

export const css = (args: StyleObjectOrFn = {}) => (
  props: PropsOrTheme = {},
) => {
  const theme = "theme" in props ? props.theme : props

  let computedStyles: CSSObject = {}

  const styleObject = runIfFn(args, theme)
  const styles = responsive(styleObject)(theme)

  for (const k in styles) {
    const x = styles[k]
    const val = runIfFn(x, theme)

    const key = k in pseudoSelectors ? pseudoSelectors[k] : k
    const config = (parser.config as Dict)[key]

    if (key === "apply") {
      const apply = css(get(theme, val))(theme)
      computedStyles = merge({}, computedStyles, apply)
      continue
    }

    if (isObject(val)) {
      computedStyles[key] = css(val)(theme)
      continue
    }

    const scale = get(theme, config?.scale, {})
    const value = config?.transform?.(val, scale) ?? get(scale, val, val)

    if (config?.properties) {
      for (const property of config.properties) {
        computedStyles[property] = value
      }
      continue
    }

    if (config?.property) {
      computedStyles[config?.property] = value
      continue
    }

    computedStyles[key] = value
  }

  return computedStyles
}
