import { Dict } from "@chakra-ui/utils"
import merge from "lodash.mergewith"
import { StyleFunction } from "./types"

interface Props {
  theme?: Dict
  [k: string]: any
}

export const createMediaQuery = (n: string) =>
  `@media screen and (min-width: ${n})`

type ValueType = string | number | ((theme: Dict) => string | number)

interface ParseResponsiveArrayOptions {
  mediaQueries: string[]
  styleFunction: StyleFunction
  scale: any
  value: Array<ValueType>
  props: Props
}

export function parseResponsiveArray(options: ParseResponsiveArrayOptions) {
  const { mediaQueries, styleFunction, scale, value, props } = options
  let styles: Dict = {}
  value.slice(0, mediaQueries.length).forEach((value, i) => {
    const media = mediaQueries[i]
    const style = styleFunction(value, scale, props)

    if (!media) {
      styles = merge({}, styles, style)
    } else {
      styles = merge({}, styles, {
        [media]: merge({}, styles[media], style),
      })
    }
  })
  return styles
}

interface ParseResponsiveObjectOptions {
  breakpoints: Dict
  styleFunction: StyleFunction
  scale: any
  value: Record<string, ValueType>
  props: Props
}

export function parseResponsiveObject(options: ParseResponsiveObjectOptions) {
  const { breakpoints, styleFunction, scale, value: valueObj, props } = options

  let styles: Dict = {}

  for (const bp in valueObj) {
    const breakpoint = breakpoints[bp]
    const value = valueObj[bp]
    const style = styleFunction(value, scale, props)

    if (!breakpoint) {
      styles = merge({}, styles, style)
    } else {
      const media = createMediaQuery(breakpoint)
      styles = merge({}, styles, {
        [media]: merge({}, styles[media], style),
      })
    }
  }
  return styles
}
