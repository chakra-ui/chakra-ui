import { Dict, isNumber, StringOrNumber } from "@chakra-ui/utils"

export default function createMediaQueries(breakpoints: Dict): MediaQuery[] {
  return (
    Object.entries(breakpoints)
      // sort css units in ascending order to ensure media queries are generated
      // in the correct order and reference to each other correctly aswell
      .sort((a, b) =>
        Number.parseInt(a[1], 10) > Number.parseInt(b[1], 10) ? 1 : -1,
      )
      .map(([breakpoint, minWidth], index, arr) => {
        // given a following breakpoint
        const next = arr[index + 1]
        // this breakpoint must end prior the threshold of the next
        const maxWidth = next ? next[1] : undefined
        const query = createMediaQueryString(minWidth, maxWidth)

        return {
          minWidth,
          maxWidth,
          breakpoint,
          query,
        }
      })
  )
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
