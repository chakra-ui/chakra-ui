import { Dict, isCssVar, isNumber } from "@chakra-ui/utils"
import {
  getTransformGpuTemplate,
  getTransformTemplate,
} from "../create-theme-vars/transform-template"
import { gradientTransform } from "./parse-gradient"

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString())
  const unit = value.toString().replace(String(num), "")
  return { unitless: !unit, value: num, unit }
}

const wrap = (str: string) => (value: any) => `${str}(${value})`

export const transformFunctions = {
  filter(value: any) {
    if (value !== "auto") return value
    return {
      "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
      filter: [
        "var(--chakra-blur)",
        "var(--chakra-brightness)",
        "var(--chakra-contrast)",
        "var(--chakra-grayscale)",
        "var(--chakra-hue-rotate)",
        "var(--chakra-invert)",
        "var(--chakra-saturate)",
        "var(--chakra-sepia)",
        "var(--chakra-drop-shadow)",
      ].join(" "),
    }
  },

  backdropFilter(value: any) {
    if (value !== "auto") return value
    return {
      backdropFilter: [
        "var(--chakra-backdrop-blur)",
        "var(--chakra-backdrop-brightness)",
        "var(--chakra-backdrop-contrast)",
        "var(--chakra-backdrop-grayscale)",
        "var(--chakra-backdrop-hue-rotate)",
        "var(--chakra-backdrop-invert)",
        "var(--chakra-backdrop-opacity)",
        "var(--chakra-backdrop-saturate)",
        "var(--chakra-backdrop-sepia)",
      ].join(" "),
      "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
      "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
    }
  },

  ring(value: string) {
    return {
      "--chakra-ring-offset-shadow": `var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)`,
      "--chakra-ring-shadow": `var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)`,
      "--chakra-ring-width": transformFunctions.px(value),
      boxShadow: [
        `var(--chakra-ring-offset-shadow)`,
        `var(--chakra-ring-shadow)`,
        `var(--chakra-shadow, 0 0 #0000)`,
      ].join(", "),
    }
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
