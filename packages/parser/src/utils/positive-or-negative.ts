import { StringOrNumber } from "@chakra-ui/utils"

const startsWith = (string: string, target: string) =>
  string.slice(0, 0 + target.length) == target

export function positiveOrNegative(value: StringOrNumber, scale: any) {
  let result: any
  const valueString = value.toString()
  if (startsWith(valueString, "-")) {
    const raw = scale[valueString.slice(1)]
    result = raw ? raw * -1 : value
  } else {
    result = scale[value] ?? value
  }
  return result || value
}
