const BASE_FONT_SIZE = 16

const UNIT_PX = "px"
const UNIT_EM = "em"
const UNIT_REM = "rem"

export function getUnit(value = ""): string | undefined {
  const DIGIT_REGEX = new RegExp(String.raw`-?\d+(?:\.\d+|\d*)`)
  const UNIT_REGEX = new RegExp(`${UNIT_PX}|${UNIT_EM}|${UNIT_REM}`)

  const unit = value.match(
    new RegExp(`${DIGIT_REGEX.source}(${UNIT_REGEX.source})`),
  )
  return unit?.[1]
}

export function toPx(value: string | number = ""): string | undefined {
  if (typeof value === "number") {
    return `${value}px`
  }

  const unit = getUnit(value)

  if (!unit) return value

  if (unit === UNIT_PX) {
    return value
  }

  if (unit === UNIT_EM || unit === UNIT_REM) {
    return `${parseFloat(value) * BASE_FONT_SIZE}${UNIT_PX}`
  }
}

export function toEm(
  value = "",
  fontSize = BASE_FONT_SIZE,
): string | undefined {
  const unit = getUnit(value)

  if (!unit) return value

  if (unit === UNIT_EM) {
    return value
  }

  if (unit === UNIT_PX) {
    return `${parseFloat(value) / fontSize}${UNIT_EM}`
  }

  if (unit === UNIT_REM) {
    return `${(parseFloat(value) * BASE_FONT_SIZE) / fontSize}${UNIT_EM}`
  }
}

export function toRem(value = ""): string | undefined {
  const unit = getUnit(value)

  if (!unit) return value

  if (unit === UNIT_REM) {
    return value
  }

  if (unit === UNIT_EM) {
    return `${parseFloat(value)}${UNIT_REM}`
  }

  if (unit === UNIT_PX) {
    return `${parseFloat(value) / BASE_FONT_SIZE}${UNIT_REM}`
  }
}
