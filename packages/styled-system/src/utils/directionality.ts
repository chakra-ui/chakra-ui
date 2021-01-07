import { bindMethods, Dict } from "@chakra-ui/utils"
import * as CSS from "csstype"

type CSSProp = keyof CSS.Properties

const determineTheme = (props: Dict): Dict =>
  "theme" in props ? props.theme : props

export function getIsRtl(props: Dict) {
  const theme = determineTheme(props)
  return theme.direction === TextDirection.rtl
}

export enum TextDirection {
  /**
   * The text flows from left to right (e.g., English, French).
   */
  ltr = "ltr",
  /**
   * The text flows from right to left (e.g. Arabic, Hebrew).
   */
  rtl = "rtl",
}

interface GetLogicalValue<P> {
  ltr: P | P[]
  rtl: P | P[]
  value: any
}

export class Directionality<T extends Dict = Dict> {
  theme: T
  direction: TextDirection
  isRtl: boolean

  constructor(options: T) {
    const theme = determineTheme(options) as T
    this.theme = theme
    this.direction = theme.direction
    this.isRtl = theme.direction === TextDirection.rtl
    bindMethods(this)
  }

  getLogicalStyle<P extends CSSProp>(options: GetLogicalValue<P>) {
    const { ltr, rtl, value } = options
    const result = {} as Record<CSSProp, string | number>
    if (Array.isArray(ltr) && Array.isArray(rtl)) {
      for (let i = 0; i < ltr.length; i += 1) {
        const key = this.isRtl ? rtl[i] : ltr[i]
        result[key] = value
      }
    } else {
      const key = (this.isRtl ? rtl : ltr) as P
      result[key] = value
    }
    return result
  }

  getFourCornerValue(value: string) {
    const split = toList(value)
    const dontFlip = split.length <= 3 || split.length > 4
    if (dontFlip) return value
    const [top, right, bottom, left] = split
    const flippedValue = [top, left, bottom, right].join(" ")
    return this.isRtl ? flippedValue : value
  }
}

function toList(value: string): string[] {
  return value
    .replace(/ +/g, " ")
    .split(" ")
    .map((i) => i.trim())
    .filter(Boolean)
}
