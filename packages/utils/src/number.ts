import { isNotNumber } from "./assertion"
import { warn } from "./logger"

export const minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991
export const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991

function toNumber(value: any) {
  const num = parseFloat(value)
  return isNotNumber(num) ? 0 : num
}

export function toPrecision(value: number, precision?: number) {
  let nextValue: string | number = toNumber(value)
  const scaleFactor = Math.pow(10, precision ?? 10)
  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor
  return precision ? nextValue.toFixed(precision) : nextValue.toString()
}

export function countDecimalPlaces(value: number) {
  if (!isFinite(value)) return 0

  let e = 1
  let p = 0
  while (Math.round(value * e) / e !== value) {
    e *= 10
    p++
  }
  return p
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min)
}

export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min
}

export function roundValueToStep(value: number, step: number) {
  const nextValue = Math.round(value / step) * step
  const precision = countDecimalPlaces(step)
  return toPrecision(nextValue, precision)
}

export function clampValue(value: number, min: number, max: number) {
  if (value == null) return value

  warn({
    condition: max < min,
    message: "[Chakra UI] clamp: max cannot be less than min",
  })

  return Math.min(Math.max(value, min), max)
}
