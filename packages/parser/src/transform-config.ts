import * as CSS from "csstype"
import { get } from "./get"
import { isNull } from "@chakra-ui/utils"

export interface ConfigStyle {
  /** The CSS property to use in the returned style object (overridden by `properties` if present). */
  property?: keyof CSS.Properties
  /**
   * An array of multiple properties (e.g. `['marginLeft', 'marginRight']`) to which this style's value will be
   * assigned (overrides `property` when present).
   */
  properties?: Array<keyof CSS.Properties>
  /** A string referencing a key in the `theme` object. */
  scale?: string
  /** A fallback scale object for when there isn't one defined in the `theme` object. */
  fallbackScale?: any
  /** A function to transform the raw value based on the scale. */
  transform?: (value: any, scale?: any) => any
}

export type Config = null | true | ConfigStyle

export type ConfigObject = { [prop: string]: Config }

export function transformConfig(configs: ConfigObject, theme: any) {
  const result: any = {}
  Object.keys(configs).forEach(key => {
    const config = configs[key]

    if (isNull(config)) return

    if (config === true) {
      result[key] = { property: key }
      return
    }

    const { property, properties, scale, transform, fallbackScale } = config

    if (property) {
      result[key] = {
        property,
        ...(!!transform && { transform }),
        ...(!!scale && { scale: get(theme, scale, fallbackScale) }),
      }
      return
    }

    //@ts-ignore
    result[key] = properties.map(prop => ({
      property: prop,
      ...(!!transform && { transform }),
      ...(!!scale && { scale: get(theme, scale, fallbackScale) }),
    }))
  })

  return result
}
