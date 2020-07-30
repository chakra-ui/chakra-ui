import { Dict, isNumber, breakpoints as bps } from "@chakra-ui/utils"
import calculateMeasurement from "calculate-measurement"

/**
 * Create a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`.
 */
function createMediaQueries(breakpoints: Dict) {
  // get the non-number breakpoint keys from the provided breakpoints
  const keys = Object.keys(breakpoints)

  // use only the keys matching the official breakpoints names, and sort them in
  // largest to smallest order
  const sorted = bps.filter((bp) => keys.includes(bp)).reverse()

  // create a min-max media query string
  return sorted.map((breakpoint, index) => {
    const minWidth = breakpoints[breakpoint]
    const next = sorted[index - 1] as string | undefined
    const maxWidth = next ? breakpoints[next] : undefined

    let query = ""

    if (parseInt(minWidth) >= 0) {
      query = `(min-width: ${toMediaString(minWidth)})`
    }

    if (maxWidth) {
      if (query) {
        query += " and "
      }
      query += `(max-width: ${toMediaString(subtract(maxWidth))})`
    }

    const mediaQuery: MediaQuery = {
      breakpoint,
      maxWidth,
      minWidth,
      query,
    }

    return mediaQuery
  })
}

interface MediaQuery {
  breakpoint: string
  maxWidth?: string
  minWidth: string
  query: string
}

function subtract(value: any) {
  return calculateMeasurement(value, -0.01)
}

/**
 * Convert media query value to string
 */
function toMediaString(value: any) {
  return isNumber(value) ? `${value}px` : value
}

export default createMediaQueries
