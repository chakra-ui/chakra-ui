import { isCssVar, isNumber } from "@chakra-ui/utils"
import { Transform } from "./types"
import { gradientTransform } from "./parse-gradient"

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

type TransformFunctions = Record<
  | "fraction"
  | "float"
  | "degree"
  | "px"
  | "transform"
  | "bgClip"
  | "gradient"
  | "filter"
  | "backdropFilter"
  | "opacity"
  | "brightness"
  | "contrast"
  | "dropShadow"
  | "grayscale"
  | "hueRotate"
  | "invert"
  | "saturate"
  | "sepia"
  | "blur",
  Transform
>

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

export const transformFunctions: TransformFunctions = {
  filter(value) {
    return filterTemplates[value] ?? value
  },

  backdropFilter(value) {
    return backdropFilterTemplates[value] ?? value
  },

  bgClip(value: string) {
    return value === "text"
      ? { color: "transparent", backgroundClip: "text" }
      : { backgroundClip: value }
  },

  transform(value) {
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

  float(value, theme) {
    const map = { left: "right", right: "left" }
    return theme.direction === "rtl" ? map[value] : value
  },

  degree(value) {
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
