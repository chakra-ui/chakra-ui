import * as CSS from "csstype"
import { isNull, isArray, isObject, Dict, deepmerge } from "@chakra-ui/utils"
import { getMediaQuery } from "./media-query"
import { getValue } from "./get"
import { sort } from "./sort-styles"

export type ResponsiveValue<T> = T | Array<T> | { [breakpoint: string]: T }

export type ProcessorOptions = {
  property: keyof CSS.Properties
  value?: ResponsiveValue<string | number>
  transform?: (value: any, scale: any) => any
  scale?: string
}

export function assignArrayValue(options: {
  values: any[]
  mediaQueries: string[]
  prop: string
  transform: (value: any) => any
}) {
  const { values, prop, transform, mediaQueries } = options
  const styles: Dict = {}

  values.forEach((value, index) => {
    // ignore array values longer than breakpoints
    if (index > mediaQueries.length) return
    // Do not create a media query for the first index
    if (index === 0) {
      styles[prop] = transform(value)
      return
    }

    const media = mediaQueries[index - 1]

    styles[media] = styles[media] ?? {}
    if (value == null) return
    styles[media][prop] = transform(value)
  })

  return styles
}

function assignObjectValue(options: {
  values: Dict
  mediaQueries: Dict
  prop: string
  transform: (value: any) => any
}) {
  const { values, prop, transform, mediaQueries } = options

  const styles: Dict = {}

  for (const breakpoint in values) {
    // value doesn't exist in breakpoint, use as default
    const breakpointValue = values[breakpoint]
    if (mediaQueries[breakpoint] == null) {
      styles[prop] = transform(breakpointValue)
      continue
    }

    const media = mediaQueries[breakpoint]

    if (!styles[media]) styles[media] = {}
    styles[media][prop] = transform(breakpointValue)
  }

  return styles
}

export function createProcessor(breakpoints: Dict) {
  let styles: Dict = {}
  const queries = getMediaQuery(breakpoints)

  return {
    apply(options: ProcessorOptions) {
      const { property, transform = getValue, value, scale } = options
      const assign = (value: any) => transform(value, scale)

      if (isNull(value)) return

      if (isArray(value)) {
        const computedStyles = assignArrayValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asArray,
        })

        styles = deepmerge(styles, computedStyles)

        return
      }

      if (isObject(value)) {
        const computedStyles = assignObjectValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asObject,
        })

        styles = deepmerge(styles, computedStyles)

        return
      }

      styles = deepmerge(styles, { [property]: value })
    },
    value: () => sort(styles),
  }
}
