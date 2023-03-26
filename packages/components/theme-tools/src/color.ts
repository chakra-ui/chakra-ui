import {
  toHex,
  parseToRgba,
  transparentize as setTransparency,
  mix,
  darken as reduceLightness,
  lighten as increaseLightness,
  getContrast,
  parseToHsla,
  hsla,
  getLuminance,
} from "color2k"

import get from "dlv"

type Dict = { [key: string]: any }
const isEmptyObject = (obj: any) => Object.keys(obj).length === 0

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 *
 * @deprecated This will be removed in the next major release.
 */
export const getColor = (theme: Dict, color: string, fallback?: string) => {
  const hex = get(theme, `colors.${color}`, color)
  try {
    toHex(hex)
    return hex
  } catch {
    // returning black to stay consistent with TinyColor behaviour so as to prevent breaking change
    return fallback ?? "#000000"
  }
}

const getBrightness = (color: string) => {
  const [r, g, b] = parseToRgba(color)
  // http://www.w3.org/TR/AERT#color-contrast
  return (r * 299 + g * 587 + b * 114) / 1000
}

/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 *
 * @deprecated This will be removed in the next major release.
 */
export const tone = (color: string) => (theme: Dict) => {
  const hex = getColor(theme, color)
  const brightness = getBrightness(hex)
  const isDark = brightness < 128
  return isDark ? "dark" : "light"
}

/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 *
 * @deprecated This will be removed in the next major release.
 */
export const isDark = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "dark"

/**
 * Determines if a color tone is "light"
 * @param color - the color in hex, rgb, or hsl
 *
 * @deprecated This will be removed in the next major release.
 */
export const isLight = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "light"

/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 *
 * @deprecated This will be removed in the next major release.
 */
export const transparentize =
  (color: string, opacity: number) => (theme: Dict) => {
    const raw = getColor(theme, color)
    return setTransparency(raw, 1 - opacity)
  }

/**
 * Add white to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-100)
 *
 * @deprecated This will be removed in the next major release.
 */
export const whiten = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return toHex(mix(raw, "#fff", amount))
}

/**
 * Add black to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount black to add (0-100)
 *
 * @deprecated This will be removed in the next major release.
 */
export const blacken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return toHex(mix(raw, "#000", amount / 100))
}

/**
 * Darken a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to darken (0-100)
 *
 * @deprecated This will be removed in the next major release.
 */
export const darken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return toHex(reduceLightness(raw, amount / 100))
}

/**
 * Lighten a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to lighten (0-100)
 *
 * @deprecated This will be removed in the next major release.
 */
export const lighten = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  toHex(increaseLightness(raw, amount / 100))
}

/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 *
 * @deprecated This will be removed in the next major release.
 */
export const contrast = (fg: string, bg: string) => (theme: Dict) =>
  getContrast(getColor(theme, bg), getColor(theme, fg))

interface WCAG2Params {
  level?: "AA" | "AAA"
  size?: "large" | "small"
}

/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for contrast ratio.
 *
 * @param textColor - the foreground or text color
 * @param bgColor - the background color
 * @param options
 *
 * @deprecated This will be removed in the next major release.
 */
export const isAccessible =
  (textColor: string, bgColor: string, options?: WCAG2Params) =>
  (theme: Dict) =>
    isReadable(getColor(theme, bgColor), getColor(theme, textColor), options)

export function isReadable(
  color1: string,
  color2: string,
  wcag2: WCAG2Params = { level: "AA", size: "small" },
): boolean {
  const readabilityLevel = readability(color1, color2)
  switch ((wcag2.level ?? "AA") + (wcag2.size ?? "small")) {
    case "AAsmall":
    case "AAAlarge":
      return readabilityLevel >= 4.5
    case "AAlarge":
      return readabilityLevel >= 3
    case "AAAsmall":
      return readabilityLevel >= 7
    default:
      return false
  }
}

export function readability(color1: string, color2: string): number {
  return (
    (Math.max(getLuminance(color1), getLuminance(color2)) + 0.05) /
    (Math.min(getLuminance(color1), getLuminance(color2)) + 0.05)
  )
}
/**
 *
 * @deprecated This will be removed in the next major release.
 */
export const complementary = (color: string) => (theme: Dict) => {
  const raw = getColor(theme, color)
  const hsl = parseToHsla(raw)
  const complementHsl: [number, number, number, number] = Object.assign(hsl, [
    (hsl[0] + 180) % 360,
  ])
  return toHex(hsla(...complementHsl))
}

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

interface RandomColorOptions {
  /**
   * If passed, string will be used to generate
   * random color
   */
  string?: string
  /**
   * List of colors to pick from at random
   */
  colors?: string[]
}

const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`

export function randomColor(opts?: RandomColorOptions) {
  const fallback = randomHex()

  if (!opts || isEmptyObject(opts)) {
    return fallback
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors)
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string)
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors)
  }

  return fallback
}

function randomColorFromString(str: string) {
  let hash = 0
  if (str.length === 0) return hash.toString()
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  let color = "#"
  for (let j = 0; j < 3; j += 1) {
    const value = (hash >> (j * 8)) & 255
    color += `00${value.toString(16)}`.substr(-2)
  }
  return color
}

function randomColorFromList(str: string, list: string[]) {
  let index = 0
  if (str.length === 0) return list[0]
  for (let i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index)
    index = index & index
  }
  index = ((index % list.length) + list.length) % list.length
  return list[index]
}

function randomFromList(list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}
