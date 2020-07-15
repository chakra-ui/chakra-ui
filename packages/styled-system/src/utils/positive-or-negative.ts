import { StringOrNumber, isString, isNumber } from "@chakra-ui/utils"

const startsWith = (string: string, target: string) =>
  string.slice(0, 0 + target.length) == target

export function positiveOrNegative(value: StringOrNumber, scale: any) {
  if (!scale) return value

  let result: any

  const valueString = value.toString()

  if (startsWith(valueString, "-")) {
    const raw = scale[valueString.slice(1)]
    if (isString(raw)) {
      result = "-" + raw
    } else if (isNumber(raw)) {
      result = raw * -1
    } else {
      result = value
    }
  } else {
    result = scale[value] ?? value
  }
  return result || value
}
