declare module "css-get-unit" {
  /**
   * Gets unit from the CSS value without verifying. If there is no unit it will return `null`
   */
  export default function unit(val: string): string | null
}

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

  export interface StyleFn {
    (...args: any[]): any
    config?: object
    propNames?: string[]
    cache?: object
  }

  export function merge(obj1: object, obj2: object): object
  export function get(obj: any, ...paths: Array<string | number>): any
  export function createParser(config: ConfigStyle): StyleFn
  export function createStyleFunction(args: ConfigStyle): StyleFn
  export function system(styleDefinitions: Config): StyleFn
  export function compose(...parsers: StyleFn[]): StyleFn
}
