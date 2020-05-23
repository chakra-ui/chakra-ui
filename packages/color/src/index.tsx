import tiny from "tinycolor2"
import { get, Dict } from "@chakra-ui/utils"

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */
export const getColor = (theme: Dict, color: string, fallback?: string) => {
  const raw = get(theme, `colors.${color}`, color)
  const isValid = tiny(raw).isValid()
  return isValid ? raw : fallback
}

/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const tone = (color: string) => (theme: Dict) => {
  const isDark = tiny(getColor(theme, color)).isDark()
  return isDark ? "dark" : "light"
}

/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */
export const isDark = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "dark"

/**
 * Determines if a color tone is "light"
 * @param color - the color in hex, rgb, or hsl
 */
export const isLight = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "light"

/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add
 */
export const opacity = (color: string, opacity: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return tiny(raw).setAlpha(opacity).toRgbString()
}

/**
 * Add white to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const tint = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return tiny.mix(raw, "#fff", amount).toHexString()
}

/**
 * Add black to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const shade = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return tiny.mix(raw, "#000", amount).toHexString()
}

/**
 * Darken a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-1)
 */
export const darken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return tiny(raw).darken(amount).toHexString()
}

export const lighten = (color: string, amount: number) => (theme: Dict) =>
  tiny(getColor(theme, color)).lighten(amount).toHexString()

/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const contrast = (fg: string, bg: string) => (theme: Dict) =>
  tiny.readability(getColor(theme, bg), getColor(theme, fg))

/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for constract ratio.
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const isAccessible = (
  fg: string,
  bg: string,
  options?: tiny.WCAG2Options,
) => (theme: Dict) =>
  tiny.isReadable(getColor(theme, bg), getColor(theme, fg), options)

export const complementary = (color: string) => (theme: Dict) =>
  tiny(getColor(theme, color)).complement().toHexString()

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
export const toAlphas = (color: string) => ({
  900: opacity(color, 0.92),
  800: opacity(color, 0.8),
  700: opacity(color, 0.6),
  600: opacity(color, 0.48),
  500: opacity(color, 0.38),
  400: opacity(color, 0.24),
  300: opacity(color, 0.16),
  200: opacity(color, 0.12),
  100: opacity(color, 0.08),
  50: opacity(color, 0.04),
})

type Emphasis = "high" | "medium" | "low" | "lowest"

export const ink = (color: string, emphasis: Emphasis) => {
  const values = {
    high: toAlphas(color)[900],
    medium: toAlphas(color)[700],
    low: toAlphas(color)[500],
    lowest: toAlphas(color)[300],
  }
  return values[emphasis]
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

export function randomColor() {
  return tiny.random().toHexString()
}

randomColor.fromString = stringToColor
randomColor.fromList = randomFromList

function randomFromList(str: string, list: string[]) {
  let index = 0
  if (str.length === 0) return list[0]
  for (let i = 0; i < str.length; i++) {
    index = str.charCodeAt(i) + ((index << 5) - index)
    index = index & index
  }
  index = ((index % list.length) + list.length) % list.length
  return list[index]
}
