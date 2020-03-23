import tiny from "tinycolor2"
import { get } from "@chakra-ui/utils"

export function getColor(theme: object, color: string, fallback?: string) {
  const result = get(theme, `colors.${color}`, color)
  const isValid = tiny(result).isValid()
  return isValid ? result : fallback
}

/**
 * Determines whether the given color is "light" or "dark".
 *
 * @param color the color in hex, rgb, or hsl
 */
export function tone(color: string) {
  return function(theme: object) {
    const isDark = tiny(getColor(theme, color)).isDark()
    return isDark ? "dark" : "light"
  }
}

export function isDark(color: string) {
  return function(theme: object) {
    return tiny(getColor(theme, color)).isDark()
  }
}

export function isLight(color: string) {
  return function(theme: object) {
    return tiny(getColor(theme, color)).isLight()
  }
}

export function addOpacity(color: string, opacity: number) {
  return function(theme: object) {
    return tiny(getColor(theme, color))
      .setAlpha(opacity)
      .toRgbString()
  }
}

export const mixWithWhite = (color: string, amount: number) => (
  theme: object,
) => tiny.mix(getColor(theme, color), "#fff", amount).toHexString()

export const mixWithBlack = (color: string, amount: number) => (
  theme: object,
) => tiny.mix(getColor(theme, color), "#000", amount).toHexString()

export function darken(color: string, amount: number) {
  return function(theme: object) {
    return tiny(getColor(theme, color))
      .darken(amount)
      .toHexString()
  }
}

export function lighten(color: string, amount: number) {
  return function(theme: object) {
    return tiny(getColor(theme, color))
      .lighten(amount)
      .toHexString()
  }
}

export function getContrastRatio(
  foregroundColor: string,
  backgroundColor: string,
) {
  return function(theme: object) {
    return tiny.readability(
      getColor(theme, backgroundColor),
      getColor(theme, foregroundColor),
    )
  }
}

export const passWCAGRequirement = (fg: string, bg: string) => (
  theme: object,
) => tiny.isReadable(getColor(theme, bg), getColor(theme, fg))

export const getRandomColor = () => tiny.random().toHexString()

export const getComplementary = (color: string) => (theme: object) =>
  tiny(getColor(theme, color))
    .complement()
    .toHexString()

export function generateStripe(
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)",
) {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size} ${size}`,
  }
}

/**
 * Returns an accessible ink color of any given fill color.
 *
 * @param color
 */
export function generateAlphaColors(color: string) {
  return {
    900: addOpacity(color, 0.92),
    800: addOpacity(color, 0.8),
    700: addOpacity(color, 0.6),
    600: addOpacity(color, 0.48),
    500: addOpacity(color, 0.38),
    400: addOpacity(color, 0.24),
    300: addOpacity(color, 0.16),
    200: addOpacity(color, 0.12),
    100: addOpacity(color, 0.08),
    50: addOpacity(color, 0.04),
  }
}

type Emphasis = "high" | "medium" | "low" | "lowest"

export function colorEmphasis(color: string, emphasis: Emphasis) {
  return {
    high: color,
    medium: generateAlphaColors(color)[700],
    low: generateAlphaColors(color)[500],
    lowest: generateAlphaColors(color)[300],
  }[emphasis]
}

export function stringToColor(str: string) {
  let hash = 0
  if (str.length === 0) return hash.toString()
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  let color = "#"
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 255
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}
