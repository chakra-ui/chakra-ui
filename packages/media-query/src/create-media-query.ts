import { isNumber, isCustomBreakpoint, StringOrNumber } from "@chakra-ui/utils"

function createMediaQueries(breakpoints: string[]): MediaQuery[] {
  /**
   * Get the non-number breakpoint keys from the provided breakpoints
   *
   * reverse to begin with the largest
   */
  const keys = Object.keys(breakpoints).filter(isCustomBreakpoint).reverse()

  /**
   * create a min-max media query string
   */
  return keys.map((breakpoint, index) => {
    const minWidth = breakpoints[breakpoint]

    const next = keys[index - 1]
    const maxWidth = next ? breakpoints[next] : undefined

    const query = createMediaQueryString(minWidth, maxWidth)

    return {
      breakpoint,
      maxWidth,
      minWidth,
      query,
    }
  })
}

/**
 * Create a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`.
 */
function createMediaQueryString(minWidth: string, maxWidth?: string) {
  const hasMinWidth = parseInt(minWidth, 10) >= 0

  if (!hasMinWidth && !maxWidth) {
    return ""
  }

  let query = `(min-width: ${toMediaString(minWidth)})`

  if (!maxWidth) {
    return query
  }

  if (query) {
    query += " and "
  }

  query += `(max-width: ${toMediaString(subtract(maxWidth))})`

  return query
}

interface MediaQuery {
  breakpoint: string
  maxWidth?: string
  minWidth: string
  query: string
}

const measurementRegex = /(\d+\.?\d*)/u

const calculateMeasurement = (
  value: StringOrNumber,
  modifier: number,
): string => {
  if (typeof value === "number") {
    return `${value + modifier}`
  }

  return value.replace(
    measurementRegex,
    (match) => `${parseFloat(match) + modifier}`,
  )
}

/**
 * 0.01 and 0.1 are too small of a difference for `px` breakpoint values
 *
 * @see https://github.com/chakra-ui/chakra-ui/issues/2188#issuecomment-712774785
 */
function subtract(value: string) {
  return calculateMeasurement(value, value.endsWith("px") ? -1 : -0.01)
}

/**
 * Convert media query value to string
 */
function toMediaString(value: StringOrNumber) {
  return isNumber(value) ? `${value}px` : value
}

export default createMediaQueries
