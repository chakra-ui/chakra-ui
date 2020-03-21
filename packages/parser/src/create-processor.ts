import * as CSS from "csstype"
import {
  isNull,
  isArray,
  isObject,
  Dict,
  deepmerge,
  getWithDefault,
} from "@chakra-ui/utils"
import { getMediaQuery } from "./media-query"
import { sort } from "./sort-styles"
import assignArrayValue from "./assign-array-value"
import assignObjectValue from "./assign-object-value"

export type ResponsiveValue<T> = T | Array<T> | { [breakpoint: string]: T }

export type ProcessorOptions = {
  property: keyof CSS.Properties
  value?: ResponsiveValue<string | number>
  transform?: (value: any, scale: any) => any
  scale?: string
}

/**
 * The engine that transforms a style props to
 * actual CSS style objects.
 *
 * @param breakpoints - the breakpoint object from theme
 */
export function createProcessor(breakpoints: Dict) {
  let styles: Dict = {}

  const queries = getMediaQuery(breakpoints)

  return {
    apply(options: ProcessorOptions) {
      const { property, transform = getWithDefault, value, scale } = options

      const assign = (value: any) => transform(value, scale)

      if (isNull(value)) return

      if (isArray(value)) {
        const style = assignArrayValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asArray,
        })

        styles = deepmerge(styles, style)

        return
      }

      if (isObject(value)) {
        const style = assignObjectValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asObject,
        })

        styles = deepmerge(styles, style)

        return
      }

      styles[property] = assign(value)
    },
    value: () => sort(styles),
  }
}
