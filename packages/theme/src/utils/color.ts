import { Dict, get } from "@chakra-ui/utils"
import { parseToRgba, transparentize as setTransparency, toHex } from "color2k"

export const getColor = (theme: Dict, color: string, fallback?: string) => {
  const hex = get(theme, `colors.${color}`, color)
  try {
    toHex(hex)
    return hex
  } catch {
    return fallback ?? "#000000"
  }
}

export const transparentize =
  (color: string, opacity: number) => (theme: Dict) => {
    const raw = getColor(theme, color)
    return setTransparency(raw, 1 - opacity)
  }

const getColorBrightness = (color: string) => {
  const [r, g, b] = parseToRgba(color)
  return (r * 299 + g * 587 + b * 114) / 1000
}

export const isDarkColor = (color: string) => (theme: Dict) => {
  const hex = getColor(theme, color)
  return getColorBrightness(hex) < 128
}
