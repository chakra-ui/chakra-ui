import { Dict } from "@chakra-ui/utils"

interface Options {
  /**
   * Object representation of responsive value
   * @example { sm: "40px", md: "90px" }
   */
  values: Dict
  /**
   * CSS media query object
   * @example { sm: `@media (min-width: 400px)` }
   */
  mediaQueries: Dict
  /**
   * The prop name for the given value
   */
  prop: string
  /**
   * A function that transforms each
   * value in the `values` object
   */
  transform(value: any): any
}

/**
 * Given an object of resposive values, and breakpoints,
 * this function matches each value to it's respective
 * media query, and provides an open to transform the value.
 *
 * For example
 *
 * ```js
 * const result = assignObject({
 *  values: { base: "20px", sm: "40px", md: "60px" }
 *  mediaQueries: { sm: "@media(min-width: 320px)", md: "@media(min-width: 768px)" },
 *  prop: "margin",
 *  transform: val => val
 * })
 *
 * result = {
 *   margin: "20px",
 *   "@media(min-width: 320px)": {
 *     margin: "40px"
 *   },
 *   "@media(min-width: 768px)": {
 *     margin: "60px"
 *   }
 * }
 * ```
 */
export function assignObject(options: Options) {
  const { values, prop, transform, mediaQueries } = options

  const styles: Dict = {}

  for (const breakpoint in values) {
    const value = values[breakpoint]
    /**
     * If the value doesn't exist in breakpoint, use as default.
     *
     * @example
     * marginTop = { base: "30px", md: "40px" }
     *
     * `base` doesn't exist in breakpoints so we'll
     * use it as the value for all breakpoints
     */
    if (mediaQueries[breakpoint] == null) {
      styles[prop] = transform(value)
      continue
    }

    const mediaQuery = mediaQueries[breakpoint]

    styles[mediaQuery] = styles[mediaQuery] ?? {}

    styles[mediaQuery][prop] = transform(value)
  }

  return styles
}
