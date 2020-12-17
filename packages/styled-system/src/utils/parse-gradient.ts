import { Dict, memoizedGet as get } from "@chakra-ui/utils"
import { ConfigStyle } from "@styled-system/core"

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

export enum ErrorMessages {
  INVALID_SYNTAX = "Invalid value passed to prop: `bgGradient`",
  INVALID_DIRECTION = "Direction is not valid. Defaulting to `top right`",
}

const DEFAULT_DIR: keyof typeof directionMap = "to-r"
export const DEFAULT_TO_COLOR = "rgba(255, 0, 0, 0)"

const globals = [
  "none",
  "-moz-initial",
  "inherit",
  "initial",
  "revert",
  "unset",
]

export function parseGradient(value: string, theme: Dict) {
  if (globals.includes(value)) {
    return value
  }

  const valueSplit = value.split(" ").filter(Boolean)

  if (valueSplit.length > 2) {
    throw Error(ErrorMessages.INVALID_SYNTAX)
  }

  let [dir, colors] = valueSplit

  if (valueSplit.length === 1) {
    colors = valueSplit[0]
    dir = DEFAULT_DIR
  }

  let direction = directionMap[dir]

  if (!direction) {
    console.warn(ErrorMessages.INVALID_DIRECTION)
    direction = directionMap[DEFAULT_DIR]
  }

  const colorsArr = colors
    .split(":")
    .filter(Boolean)
    .map((color) => get(theme, `colors.${color}`, color))

  if (colorsArr.length === 1) {
    colorsArr.push(DEFAULT_TO_COLOR)
  }

  const colorsString = colorsArr.join(", ")

  return `linear-gradient(${direction}, ${colorsString})`
}

export const transformGradient: ConfigStyle["transform"] = (value, _, theme) =>
  parseGradient(value, theme ?? {})
