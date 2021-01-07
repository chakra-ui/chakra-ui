import { Dict, getWithDefault, compose } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { PropConfig } from "../core"

type CSSProp = keyof CSS.Properties

export function getIsRtl(props: Dict) {
  const theme = "theme" in props ? props.theme : props
  return theme.direction === "rtl"
}

interface LogicalTransformOptions<T> {
  ltr: T | T[]
  rtl: T | T[]
  transform?: PropConfig["transform"]
}

/**
 * Polyfill for border-{start|end}-radius properties.
 * We'll remove this once css logical properties is supported in major browsers
 */
function logicalTransform<T extends CSSProp>(opts: LogicalTransformOptions<T>) {
  const { transform, ltr, rtl } = opts

  const rtlTransform: PropConfig["transform"] = (value, scale, props) => {
    const isRtl = getIsRtl(props)
    const raw = getWithDefault(value, scale)
    const result: Dict = {}

    if (Array.isArray(ltr) && Array.isArray(rtl)) {
      for (let i = 0; i < ltr.length; i += 1) {
        result[isRtl ? rtl[i] : ltr[i]] = raw
      }
    } else {
      const key = (isRtl ? rtl : ltr) as T
      result[key] = raw
    }
    return result
  }

  return transform ? compose(transform, rtlTransform) : rtlTransform
}

interface LogicalOptions<T> {
  scale?: string
  property: { ltr: T | T[]; rtl: T | T[] }
  transform?: PropConfig["transform"]
}

export function logical<T extends CSSProp>(
  opts: LogicalOptions<T>,
): PropConfig {
  const { property, scale, transform } = opts
  return {
    property: "&",
    scale,
    transform: logicalTransform({
      ...property,
      transform,
    }),
  }
}

/**
 * Credits to https://github.com/kentcdodds/rtl-css-js/blob/aaf3e9885026de11b01f3b73258f25e21b7432f7/src/internal/utils.js
 * @todo use this for margin, padding, border-radius value transformations in rtl
 */
function getValuesAsList(value: string) {
  return value
    .replace(/ +/g, " ")
    .split(" ")
    .map((i) => i.trim())
    .filter(Boolean)
    .reduce(
      ({ list, state }, item) => {
        const openParansCount = (item.match(/\(/g) || []).length
        const closedParansCount = (item.match(/\)/g) || []).length
        if (state.parensDepth > 0) {
          list[list.length - 1] = `${list[list.length - 1]} ${item}`
        } else {
          list.push(item)
        }
        state.parensDepth += openParansCount - closedParansCount
        return { list, state }
      },
      { list: [], state: { parensDepth: 0 } } as any,
    ).list
}

export function handleQuartetValues(value: string) {
  const splitValues = getValuesAsList(value)
  if (splitValues.length <= 3 || splitValues.length > 4) {
    return value
  }
  const [top, right, bottom, left] = splitValues
  return [top, left, bottom, right].join(" ")
}
