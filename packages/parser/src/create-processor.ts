import * as CSS from "csstype"
import {
  isNull,
  isArray,
  isObject,
  Dict,
  merge,
  getWithDefault,
} from "@chakra-ui/utils"
import {
  sort,
  assignArrayValue,
  assignObjectValue,
  getMediaQuery,
} from "./utils"

export type ResponsiveValue<T> = T | Array<T> | { [breakpoint: string]: T }

export type ProcessorOptions = {
  property: keyof CSS.Properties
  value?: ResponsiveValue<string | number>
  transform?: (value: any, scale: any, props?: any) => any
  scale?: string
  props?: any
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
      const {
        property,
        transform = getWithDefault,
        value,
        scale,
        props,
      } = options

      const assign = (value: any) => transform(value, scale, props)

      if (isNull(value)) return

      if (isArray(value)) {
        const style = assignArrayValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asArray,
        })

        styles = merge(styles, style)

        return
      }

      if (isObject(value)) {
        const style = assignObjectValue({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asObject,
        })

        styles = merge(styles, style)

        return
      }

      if (property) {
        styles[property] = assign(value)
        return
      }

      styles = merge(styles, assign(value))
    },
    value: () => sort(styles),
  }
}
