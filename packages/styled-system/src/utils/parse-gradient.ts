import { Dict, isString } from "@chakra-ui/utils"
import { Transform } from "./types"

const directionMap = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left",
}

const valueSet = new Set(Object.values(directionMap))

export const globalSet = new Set([
  "none",
  "-moz-initial",
  "inherit",
  "initial",
  "revert",
  "unset",
])

const trimSpace = (str: string) => str.trim()

export function parseGradient(value: string | null | undefined, theme: Dict) {
  if (value == null || globalSet.has(value)) return value
  const regex = /(?<type>^[a-z-A-Z]+)\((?<values>(.*))\)/g
  const { type, values } = regex.exec(value)?.groups ?? {}

  if (!type || !values) return value

  const _type = type.includes("-gradient") ? type : `${type}-gradient`
  const [maybeDirection, ...stops] = values
    .split(",")
    .map(trimSpace)
    .filter(Boolean)

  if (stops?.length === 0) return value

  const direction =
    maybeDirection in directionMap
      ? directionMap[maybeDirection]
      : maybeDirection

  stops.unshift(direction)

  const _values = stops.map((stop) => {
    // if stop is valid shorthand direction, return it
    if (valueSet.has(stop)) return stop

    const firstStop = stop.indexOf(" ")

    // color stop could be `red.200 20%` based on css gradient spec
    const [_color, _stop] =
      firstStop !== -1
        ? [stop.substr(0, firstStop), stop.substr(firstStop + 1)]
        : [stop]

    const _stopOrFunc = isCSSFunction(_stop) ? _stop : _stop && _stop.split(" ")

    // else, get and transform the color token or css value
    const key = `colors.${_color}`
    const color = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color
    return _stopOrFunc
      ? [
          color,
          ...(Array.isArray(_stopOrFunc) ? _stopOrFunc : [_stopOrFunc]),
        ].join(" ")
      : color
  })

  return `${_type}(${_values.join(", ")})`
}

export const isCSSFunction = (value: unknown) => {
  return isString(value) && value.includes("(") && value.includes(")")
}

export const gradientTransform: Transform = (value, theme) =>
  parseGradient(value, theme ?? {})
