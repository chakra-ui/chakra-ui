import { isNotNumber } from "./assertion"
import { warn } from "./function"

export const minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991
export const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991

/**
 * Convert a value to number
 * @param value the value to convert
 */
function toNumber(value: any) {
  const num = parseFloat(value)
  return isNotNumber(num) ? 0 : num
}

/**
 * Converts a value to a specific precision (or decimal points).
 *
 * Returns a string representing a number in fixed-point notation.
 *
 * @param value the value to convert
 * @param precision the precision or decimal points
 */
export function toPrecision(value: number, precision?: number) {
  let nextValue: string | number = toNumber(value)
  const scaleFactor = 10 ** (precision ?? 10)
  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor
  return precision ? nextValue.toFixed(precision) : nextValue.toString()
}

/**
 * Counts the number of decimal places a number has
 *
 * @param value the decimal value to count
 */
export function countDecimalPlaces(value: number) {
  if (!Number.isFinite(value)) return 0

  let e = 1
  let p = 0
  while (Math.round(value * e) / e !== value) {
    e *= 10
    p += 1
  }
  return p
}

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min)
}

/**
 * Calculate the value based on percentage, lower and upper bound values
 *
 * @param percent the percent value in decimals (e.g 0.6, 0.3)
 * @param min the minimum value
 * @param max the maximum value
 */
export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min
}

/**
 * Rounds a specific value to the next or previous step
 *
 * @param value the value to round
 * @param from the number that stepping started from
 * @param step the specified step
 */
export function roundValueToStep(value: number, from: number, step: number) {
  const nextValue = Math.round((value - from) / step) * step + from
  const precision = countDecimalPlaces(step)
  return toPrecision(nextValue, precision)
}

/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 */
export function clampValue(value: number, min: number, max: number) {
  if (value == null) return value

  warn({
    condition: max < min,
    message: "clamp: max cannot be less than min",
  })

  return Math.min(Math.max(value, min), max)
}
