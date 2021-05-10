import { Dict, isCssVar, isNumber } from "@chakra-ui/utils"
import { gradientTransform } from "./parse-gradient"

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

const transformTemplates = {
  auto: "var(--chakra-transform)",
  "auto-gpu": "var(--chakra-transform-gpu)",
}

const filterTemplates = {
  auto: "var(--chakra-filter)",
}

const backdropFilterTemplates = {
  auto: "var(--chakra-backdrop-filter)",
}

const wrap = (str: string) => (value: any) => `${str}(${value})`

export const transformFunctions = {
  filter(value: any) {
    return filterTemplates[value] ?? value
  },

  backdropFilter(value: any) {
    return backdropFilterTemplates[value] ?? value
  },

  bgClip(value: string) {
    return value === "text"
      ? { color: "transparent", backgroundClip: "text" }
      : { backgroundClip: value }
  },

  transform(value: any) {
    return transformTemplates[value] ?? value
  },

  px(value: number | string) {
    if (value == null) return value
    const { unitless } = analyzeCSSValue(value)
    return unitless || isNumber(value) ? `${value}px` : value
  },

  fraction(value: any) {
    return !isNumber(value) || value > 1 ? value : `${value * 100}%`
  },

  float(value: any, theme: Dict) {
    const map = { left: "right", right: "left" }
    return theme.direction === "rtl" ? map[value] : value
  },

  degree(value: any) {
    if (isCssVar(value) || value == null) return value
    return isNumber(value) ? `${value}deg` : value
  },

  gradient: gradientTransform,

  blur: wrap("blur"),
  opacity: wrap("opacity"),
  brightness: wrap("brightness"),
  contrast: wrap("contrast"),
  dropShadow: wrap("drop-shadow"),
  grayscale: wrap("grayscale"),
  hueRotate: wrap("hue-rotate"),
  invert: wrap("invert"),
  saturate: wrap("saturate"),
  sepia: wrap("sepia"),
}
