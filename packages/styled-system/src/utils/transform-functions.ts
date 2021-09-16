import { Dict, isCssVar, isNumber, isString } from "@chakra-ui/utils"
import {
  backdropFilterTemplate,
  filterTemplate,
  getRingTemplate,
  getTransformGpuTemplate,
  getTransformTemplate,
  flexDirectionTemplate,
} from "./templates"
import { gradientTransform, globalSet, isCSSFunction } from "./parse-gradient"

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

const wrap = (str: string) => (value: any) => `${str}(${value})`

export const transformFunctions = {
  filter(value: any) {
    return value !== "auto" ? value : filterTemplate
  },
  backdropFilter(value: any) {
    return value !== "auto" ? value : backdropFilterTemplate
  },
  ring(value: string) {
    return getRingTemplate(transformFunctions.px(value))
  },
  bgClip(value: string) {
    return value === "text"
      ? { color: "transparent", backgroundClip: "text" }
      : { backgroundClip: value }
  },
  transform(value: any) {
    if (value === "auto") return getTransformTemplate()
    if (value === "auto-gpu") return getTransformGpuTemplate()
    return value
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
    const unitless = isString(value) && !value.endsWith("deg")
    return isNumber(value) || unitless ? `${value}deg` : value
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
  bgImage(value: any) {
    if (value == null) return value
    const prevent = isCSSFunction(value) || globalSet.has(value)
    return !prevent ? `url(${value})` : value
  },
  outline(value: any) {
    const isNoneOrZero = String(value) === "0" || String(value) === "none"
    return value !== null && isNoneOrZero
      ? { outline: "2px solid transparent", outlineOffset: "2px" }
      : { outline: value }
  },
  flexDirection(value: any) {
    const { space, divide } = flexDirectionTemplate[value] ?? {}
    const result = { flexDirection: value }
    if (space) result[space] = 1
    if (divide) result[divide] = 1
    return result
  },
}
