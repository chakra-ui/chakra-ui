import { Dict } from "@chakra-ui/utils"
import { PropConfig } from "../prop-config"

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

const globalSet = new Set([
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

    // color stop could be `red.200 20%` based on css gradient spec
    const [_color, _stop] = stop.split(" ")

    // else, get and transform the color token or css value
    const key = `colors.${_color}`
    const color = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color
    return _stop ? [color, _stop].join(" ") : color
  })

  return `${_type}(${_values.join(", ")})`
}

export const gradientTransform: PropConfig["transform"] = (value, theme) =>
  parseGradient(value, theme ?? {})
