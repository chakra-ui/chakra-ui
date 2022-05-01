import { TinyColor, readability, isReadable, WCAG2Parms } from "@ctrl/tinycolor"
import { memoizedGet as get, Dict, isEmptyObject } from "@chakra-ui/utils"

const value = `(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`

const threeValues = `[\\s|\\(]+(${value})[,|\\s]+(${value})[,|\\s]+(${value})\\s*\\)?`
const fourValues = `[\\s|\\(]+(${value})[,|\\s]+(${value})[,|\\s]+(${value})[,|\\s]+(${value})\\s*\\)?`

const matchers: Record<string, RegExp> = {
  name: /^[a-z]+$/,
  rgb: new RegExp(String("rgb").concat(threeValues)),
  rgba: new RegExp(String("rgba").concat(fourValues)),
  hsl: new RegExp(String("hsl").concat(threeValues)),
  hsla: new RegExp(String("hsla").concat(fourValues)),
  hsv: new RegExp(String("hsv").concat(threeValues)),
  hsva: new RegExp(String("hsva").concat(fourValues)),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

const colorIsValid = (color: string) => {
  const trimmedColor = color.trim()

  for (const key in matchers) {
    if (matchers[key].exec(trimmedColor)) {
      return true
    }
    return false
  }
}

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */
export const getColor = (theme: Dict, color: string, fallback?: string) => {
  const value = get(theme, `colors.${color}`, color)
  const isValid = colorIsValid(value)
  return isValid ? value : fallback
}

/**
 * Determines if the tone of given color is "light" or "dark"
 *
 * @param color - the color in hex
 */
export const tone = (color: string) => (theme: Dict) => {
  const hex: string = getColor(theme, color)

  const hexArray = Array.from(hex).slice(1)
  const rgb = [...hexArray.slice(0, 3).map((x) => parseInt(x, 16))] as [
    number,
    number,
    number,
  ]

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

  return brightness > 128 ? "dark" : "light"
}

/**
 * Determines if a color tone is "dark"
 *
 * @param color - the color in hex
 */
export const isDark = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "dark"

/**
 * Determines if a color tone is "light"
 *
 * @param color - the color in hex
 */
export const isLight = (color: string) => (theme: Dict) =>
  tone(color)(theme) === "light"

/**
 * Make a color transparent
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */
export const transparentize =
  (color: string, opacity: number) => (theme: Dict) => {
    const raw = getColor(theme, color)
    return new TinyColor(raw).setAlpha(opacity).toRgbString() // TODO replace with return rgba(r, b, g , opacity)
  }

/**
 * Add white to a color
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-100)
 */
export const whiten = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return new TinyColor(raw).mix("#fff", amount).toHexString()
}

/**
 * Add black to a color
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount black to add (0-100)
 */
export const blacken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return new TinyColor(raw).mix("#000", amount).toHexString()
}

/**
 * Darken a specified color
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to darken (0-100)
 */
export const darken = (color: string, amount: number) => (theme: Dict) => {
  const raw = getColor(theme, color)
  return new TinyColor(raw).darken(amount).toHexString()
}

/**
 * Lighten a specified color
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to lighten (0-100)
 */
export const lighten = (color: string, amount: number) => (theme: Dict) =>
  new TinyColor(getColor(theme, color)).lighten(amount).toHexString()

/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */
export const contrast = (fg: string, bg: string) => (theme: Dict) =>
  readability(getColor(theme, bg), getColor(theme, fg))

/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for contrast ratio.
 *
 * @deprecated This will be removed in the next major release.
 *
 * @param textColor - the foreground or text color
 * @param bgColor - the background color
 * @param options
 */
export const isAccessible =
  (textColor: string, bgColor: string, options?: WCAG2Parms) => (theme: Dict) =>
    isReadable(getColor(theme, bgColor), getColor(theme, textColor), options)

/**
 *
 * @deprecated This will be removed in the next major release.
 */
export const complementary = (color: string) => (theme: Dict) =>
  new TinyColor(getColor(theme, color)).complement().toHexString()

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

function randomHex() {
  return Math.floor(Math.random() * 16777215).toString(16)
}
