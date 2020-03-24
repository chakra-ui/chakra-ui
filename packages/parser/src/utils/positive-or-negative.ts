import { isNumber, isString, get } from "@chakra-ui/utils"

export function positiveOrNegative(value: string | number, scale: any) {
  if (!isNumber(value) || value >= 0) {
    return get(scale, value, value)
  }

  const absolute = Math.abs(value) as any

  const rawValue = get(scale, absolute, absolute)

  if (isString(rawValue)) return "-" + rawValue

  return Number(rawValue) * -1
}
