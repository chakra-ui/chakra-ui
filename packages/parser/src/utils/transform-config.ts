import * as CSS from "csstype"
import { isNull, get, Dict } from "@chakra-ui/utils"

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
  transform?: (value: any, scale?: any) => any
}

export type Config = null | true | StyleConfig

export type ConfigObject = { [prop: string]: Config }

/**
 * Transform an object of style props config to it's raw values.
 *
 * @param configs the config object
 * @param theme the theme object
 */
export function transformConfig(configs: ConfigObject, theme: any) {
  const transformedConfig: Dict = {}

  Object.keys(configs).forEach(prop => {
    const config = configs[prop]

    /**
     * if config doesn't exist for this prop,
     * return (no-op)
     */
    if (isNull(config)) return

    /**
     * If config is `true`, then it maps directly
     * to the css property.
     *
     * This is useful in providing a css property
     * as a style prop.
     */
    if (config === true) {
      transformedConfig[prop] = { property: prop }
      return
    }

    const { property, properties, scale, transform, fallbackScale } = config

    const scaleFromTheme = scale && get(theme, scale, fallbackScale)

    if (property) {
      transformedConfig[prop] = {
        property,
        ...(!!transform && { transform }),
        ...(!!scale && { scale: scaleFromTheme }),
      }
      return
    }

    if (properties) {
      transformedConfig[prop] = properties.map(prop => ({
        property: prop,
        ...(!!transform && { transform }),
        ...(!!scale && { scale: scaleFromTheme }),
      }))
    }
  })

  return transformedConfig
}
