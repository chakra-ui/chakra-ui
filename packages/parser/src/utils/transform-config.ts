import { Dict, get, objectKeys } from "@chakra-ui/utils"
import * as CSS from "csstype"

type Scale = Dict<string | number> | Array<string | number>

export interface StyleConfig {
  /**
   * The CSS property to use in the returned style object
   * (overridden by `properties` if present).
   */
  property?: keyof CSS.Properties
  /**
   * An array of css properties (e.g. `['marginLeft', 'marginRight']`)
   * the prop maps to.
   */
  properties?: Array<keyof CSS.Properties>
  /**
   * A reference to theme scale for this property or properties.
   */
  scale?: string
  /**
   * A fallback scale object if scale is not found
   * in theme
   */
  fallbackScale?: any
  /**
   * A function to transform the raw value based on the scale.
   */
  transform?: (value: any, scale: Scale, props: any) => any
  /**
   * Whether this prop is deprecated
   */
  deprecated?: boolean
  /**
   * If `deprecated` is `true`, what prop should it be replaced with
   * PS: This is used in the `console.warn` message
   */
  replacement?: string
}

export type Config = { [prop: string]: StyleConfig | null | true }

/**
 * Transform an object of style props config to it's raw values.
 *
 * @param config the parser config object
 * @param theme the theme object
 */
export function transformConfig(config: Config, theme: Dict) {
  const result: Dict = {}

  objectKeys(config).forEach((prop) => {
    const propConfig = config[prop]

    /**
     * if a config doesn't exist for this style prop, return (no-op)
     */
    if (propConfig === null) return

    /**
     * If prop's config is `true`, then it maps directly
     * to the css property.
     *
     * This is useful in providing a regular css property
     * as a style prop.
     */
    if (propConfig === true) {
      result[prop] = { property: prop }
      return
    }

    const {
      property,
      properties,
      scale,
      transform,
      fallbackScale,
      ...rest
    } = propConfig

    const _scale = scale && get(theme, scale, fallbackScale)

    if (property) {
      result[prop] = { property, ...rest }

      if (transform) {
        result[prop]["transform"] = transform
      }

      if (scale) {
        result[prop]["scale"] = _scale
      }

      return
    }

    if (properties) {
      result[prop] = properties.map((property) => {
        const mapResult: Dict = { property, ...rest }

        if (transform) {
          mapResult["transform"] = transform
        }

        if (scale) {
          mapResult["scale"] = _scale
        }

        return mapResult
      })

      return
    }

    result[prop] = propConfig
  })

  return result
}
