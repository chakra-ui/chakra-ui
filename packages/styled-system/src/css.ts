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
import { systemProps } from "./system"
import { normalizeBreakpoints } from "./utils"
import { StyleObjectOrFn, CSSObject } from "./css.types"

const defaultBreakpoints = ["40em", "52em", "64em"]

function getBreakpoints(theme: any) {
  const breakpoints = (theme?.breakpoints ?? defaultBreakpoints) as string[]
  return normalizeBreakpoints(breakpoints) as string[]
}

const responsive = (styles: any) => (theme?: any) => {
  const computedStyles: any = {}
  const breakpoints = getBreakpoints(theme)
  const mediaQueries = [
    null,
    ...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
  ]

  for (const key in styles) {
    let value = runIfFn(styles[key], theme ?? {})
    if (value == null) continue

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
    const key = k in pseudoSelectors ? pseudoSelectors[k] : k

    const val = runIfFn(x, theme)

    const config = (systemProps.config as Dict)[key]

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
      for (const p of config?.properties) {
        computedStyles[p] = value
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
