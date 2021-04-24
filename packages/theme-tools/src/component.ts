import { SystemStyleObject } from "@chakra-ui/system"
import {
  Dict,
  runIfFn,
  isArray,
  isNotEmptyObject,
  isNumber,
  isString,
  mergeWith,
  split,
} from "@chakra-ui/utils"

export interface StyleConfig {
  baseStyle?: SystemStyleObject
  sizes?: { [size: string]: SystemStyleObject }
  variants?: { [variant: string]: SystemStyleObject }
  defaultProps?: {
    size?: string
    variant?: string
    colorScheme?: string
  }
}

export interface MultiStyleConfig {
  baseStyle?: { [part: string]: SystemStyleObject }
  sizes?: { [size: string]: { [part: string]: SystemStyleObject } }
  variants?: { [variants: string]: { [part: string]: SystemStyleObject } }
  defaultProps?: StyleConfig["defaultProps"]
}

export interface GlobalStyleProps {
  colorScheme: string
  colorMode: "light" | "dark"
  theme: Dict
}

export type GlobalStyles = {
  global?: SystemStyleObject | ((props: GlobalStyleProps) => SystemStyleObject)
}

export type JSXElementStyles = {
  [K in keyof JSX.IntrinsicElements]?: SystemStyleObject
}

export { runIfFn }

export type Styles = GlobalStyles & JSXElementStyles

export function mode(light: any, dark: any) {
  return (props: Dict) => (props.colorMode === "dark" ? dark : light)
}

/* 
Some quick attempt at replicating `mode` but using `_dark` pseudo prop
This code is pretty rough but it gives a general idea 
*/
interface DarkStylesDict {
  [key: string]: any[] | string | number | DarkStylesDict
}

/**
 * Pass a 2-tuple to use the first value as the light theme and second value as dark theme style
 * i.e. you could pass something like:
 * ```
 * {
 *  color: ["teal.600", "teal.300"],
 * _hover: {
 *    color: ["teal.800", "teal.400"]
 *  }
 * padding: 24
 * }
 * ```
 *
 *
 * --- Note ---
 * I tried to make the API accept a 2-tuple since it seems clean, but it might clash with the responsive style array syntax...
 * So this might have to be changed to look like
 *
 * ```
 * {
 *  color: {light: "teal.600", dark: "teal.300"},
 * _hover: {
 *    color: {light: "teal.800", dark: "teal.400"}
 *  }
 * padding: 24
 * }
 * ```
 */
export function modeCssNested(styles: DarkStylesDict) {
  return Object.entries(styles).reduce(reducerFnNested, { _dark: {} })
}

export function modeCssGrouped(styles: DarkStylesDict) {
  return Object.entries(styles).reduce(reducerFnGrouped, { _dark: {} })
}

/**
 * Nests `_dark` styles exactly as they are passed, so they could be children of other selectors such as `_hover`
 * This is implemented in the `solid` button
 *
 * i.e.
 * ```
 * {
 *  color: ["teal.600", "teal.300"],
 *  _hover: {
 *    color: ["teal.800", "teal.400"]
 *  },
 *  padding: 4,
 * }
 *
 *
 * becomes
 * ```
 * {
 *  color: "teal.600"
 *  _dark: "teal.300",
 *  _hover: {
 *    color: "teal.800",
 *    _dark: "teal.400"
 *  },
 *  padding: 4,
 * }
 */
const reducerFnNested = (
  acc: Dict & { _dark: Dict },
  [key, value]: [string, any[] | string | number | DarkStylesDict],
) => {
  if (isString(value) || isNumber(value)) {
    acc[key] = value
  } else if (isArray(value) && value.length > 0) {
    if (value[0] != null) acc[key] = value[0]
    if (value[1] != null) acc._dark[key] = value[1]
  } else if (isNotEmptyObject(value)) {
    acc[key] = mergeWith(
      acc[key] || {},
      Object.entries(value).reduce(reducerFnNested, { _dark: {} }),
    )
  }
  return acc
}

/**
 * Groups all _dark styles into a single parent object, no matter how they're passed
 * This is implemented in the `ghost` button
 *
 * i.e.
 * ```
 * {
 *  color: ["teal.600", "teal.300"],
 *  _hover: {
 *    color: ["teal.800", "teal.400"]
 *  },
 *  padding: 4,
 * }
 *
 *
 * becomes
 * ```
 * {
 *  color: "teal.600",
 *  _hover: {
 *    color: "teal.800"
 *  },
 *  _dark: {
 *    color: "teal.300",
 *    _hover: {
 *      color: "teal.400"
 *    },
 *  },
 *  padding: 4,
 * }
 */
const reducerFnGrouped = (
  acc: Dict & { _dark: Dict },
  [key, value]: [string, any[] | string | number | DarkStylesDict],
) => {
  if (isString(value) || isNumber(value)) {
    acc[key] = value
  } else if (isArray(value) && value.length > 0) {
    // Take the first value in the tuple as the light theme style
    // and the second value as the dark theme style
    if (value[0] != null) acc[key] = value[0]
    if (value[1] != null) acc._dark[key] = value[1]
  } else if (isNotEmptyObject(value)) {
    // Recursively reduce the nested object
    const nestedValuesReduced = Object.entries(value).reduce(reducerFnGrouped, {
      _dark: {},
    })

    // Lift up the dark styles to a single parent object
    const [picked, omitted] = split(nestedValuesReduced, ["_dark"])
    acc[key] = mergeWith(acc[key] || {}, omitted)
    acc._dark[key] = mergeWith(acc._dark[key] || {}, picked._dark)
  }
  return acc
}

export function orient(options: {
  orientation?: "vertical" | "horizontal"
  vertical: any
  horizontal: any
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === "vertical" ? vertical : horizontal
}
