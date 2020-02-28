import { get } from "./get"
import { isNumber, isString } from "@chakra-ui/utils"

export function positiveOrNegative(scale: object, value: string | number) {
  if (!isNumber(value) || value >= 0) {
    return get(scale, value, value)
  }

  const absolute = Math.abs(value) as any
  const valueInTheme = get(scale, absolute, absolute)

  if (isString(valueInTheme)) return "-" + valueInTheme
  return Number(valueInTheme) * -1
}
