declare module "@styled-system/core" {
  import * as CSS from "csstype"

  export type ObjectOrArray<T> = T[] | { [K: string]: T | ObjectOrArray<T> }

  export type Scale = ObjectOrArray<number | string>

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
    defaultScale?: Scale
    /** A function to transform the raw value based on the scale. */
    transform?: (value: any, scale?: Scale) => any
  }

  export interface Config {
    /** Property name exposed for use in components */
    [customStyleName: string]: ConfigStyle | boolean
  }

  export interface styleFn {
    (...args: any[]): any
    config?: object
    propNames?: string[]
    cache?: object
  }

  export function merge(obj1: object, obj2: object): object
  export function get(obj: any, ...paths: Array<string | number>): any
  export function createParser(config: ConfigStyle): styleFn
  export function createStyleFunction(args: ConfigStyle): styleFn
  export function system(styleDefinitions: Config): styleFn
  export function compose(...parsers: styleFn[]): styleFn
}
