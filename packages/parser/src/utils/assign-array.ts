import { Dict } from "@chakra-ui/utils"

interface Options {
  /**
   * Array of responsive values to assign
   */
  values: any[]
  /**
   * Array of css media query strings
   * @example [`@media (min-width: 400px)`]
   */
  mediaQueries: string[]
  /**
   * The prop name for the given value
   */
  prop: string
  /**
   * A function that transforms each
   * item in the `values` array
   */
  transform(value: any): any
}

/**
 * Given an array of resposive values, and breakpoints,
 * this function matches each value to it's respective
 * media query, and provides an open to transform the value.
 *
 * For example
 *
 * ```js
 * const result = assignArray({
 *  values: ["20px", "40px", "60px"],
 *  mediaQueries: ["@media(min-width: 320px)", "@media(min-width: 760px)", "@media(min-width: 960px)"],
 *  prop: "margin",
 *  transform: val => val
 * })
 *
 * result = {
 *   margin: "20px",
 *   `@media(min-width: 320px)`: {
 *     margin: "40px"
 *   },
 *   `@media(min-width: 760px)`: {
 *     margin: "60px"
 *   }
 * }
 * ```
 */
export function assignArray(options: Options) {
  const { values, prop, transform, mediaQueries } = options

  const styles: Dict = {}

  values.forEach((value, index) => {
    /**
     * Ignore array values longer than breakpoints
     */
    if (index > mediaQueries.length) return

    /**
     * Use the value in first index as base value
     * for all breakpoints.
     *
     * @example
     * marginTop = ["20px", "40px", "60px"]
     *
     * `20px` - applies to all breakpoints (baseline)
     * `40px` - applies from first breakpoint up
     * `60px` - applies from second breakpoint up
     */
    if (index === 0) {
      styles[prop] = transform(value)
      return
    }

    const mediaQuery = mediaQueries[index - 1]

    styles[mediaQuery] = styles[mediaQuery] ?? {}

    if (value == null) return

    styles[mediaQuery][prop] = transform(value)
  })

  return styles
}
