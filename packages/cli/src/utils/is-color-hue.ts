import { isObject } from "./is-object.js"

const colorHueKeys = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
]

export function isColorHue(value: unknown): boolean {
  if (!isObject(value)) return false
  const keys = Object.keys(value)
  return colorHueKeys.every((key) => keys.includes(key))
}
