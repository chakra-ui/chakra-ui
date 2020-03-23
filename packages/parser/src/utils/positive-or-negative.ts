import { isNumber, isString, get } from "@chakra-ui/utils"
import { Scale } from "./transform-config"

export function positiveOrNegative(value: string | number, scale: Scale) {
  if (!isNumber(value) || value >= 0) {
    return get(scale, value, value)
  }

  const absolute = Math.abs(value) as any

  const rawValue = get(scale, absolute, absolute)

  if (isString(rawValue)) return "-" + rawValue

  return Number(rawValue) * -1
}
