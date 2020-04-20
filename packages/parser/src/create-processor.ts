import * as CSS from "csstype"
import {
  isNull,
  isArray,
  isObject,
  Dict,
  merge,
  getWithDefault,
} from "@chakra-ui/utils"
import { sort, assignArray, assignObject, getMediaQuery, Prop } from "./utils"

interface Options {
  /**
   * The CSS property the value maps to
   */
  property: keyof CSS.Properties
  /**
   * The responsive value
   */
  value?: Prop<string | number>
  /**
   * Function to transform the value
   *
   * @param value the value object or array
   * @param scale the theme key
   * @param props the prop object that includes the theme
   */
  transform?: (value: any, scale: any, props?: any) => any
  /**
   * The theme scale (raw values) to use
   */
  scale?: string
  /**
   * The props object that includes the theme.
   */
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
    apply(options: Options) {
      const {
        property,
        transform = getWithDefault,
        value,
        scale,
        props,
      } = options

      const assign = (objectOrArray: any) => {
        return transform(objectOrArray, scale, props)
      }

      if (isNull(value)) return

      if (isArray(value)) {
        const style = assignArray({
          values: value,
          prop: property,
          transform: assign,
          mediaQueries: queries.asArray,
        })

        styles = merge(styles, style)
        return
      }

      if (isObject(value)) {
        const style = assignObject({
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
