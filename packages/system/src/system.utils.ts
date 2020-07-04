import { css } from "@chakra-ui/css"
import { pseudoSelectors } from "@chakra-ui/parser"
import {
  get,
  isNumber,
  isString,
  UnionStringArray,
  __DEV__,
  merge,
  Dict,
  omit,
} from "@chakra-ui/utils"
import * as React from "react"
import { ForwardRefComponent } from "./system.types"
import { FunctionInterpolation } from "@emotion/core"

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export const domElements = [
  "a",
  "article",
  "aside",
  "blockquote",
  "button",
  "caption",
  "cite",
  "circle",
  "code",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "img",
  "input",
  "kbd",
  "label",
  "li",
  "mark",
  "nav",
  "ol",
  "p",
  "path",
  "pre",
  "q",
  "rect",
  "s",
  "svg",
  "section",
  "select",
  "small",
  "span",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
] as const

export type DOMElements = UnionStringArray<typeof domElements>

export const cast = <P = { theme: object }>(arg: any) =>
  arg as FunctionInterpolation<P>

export const omitThemingProps = (props: any) =>
  omit(props, ["styleConfig", "size", "variant", "colorScheme"]) as any

export function pseudoProps({ theme, ...props }: any) {
  let result = {}
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const style = css({ [prop]: props[prop] })(theme)
      result = { ...result, ...style }
    }
  }
  return result
}

export function truncateProp({ isTruncated, noOfLines }: any) {
  if (isNumber(noOfLines)) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: noOfLines,
    }
  }

  if (isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }
  }
}

export const extraProps = (props: any) => {
  const { layerStyle, textStyle, apply, theme } = props
  const styles = merge(
    get(theme, `layerStyles.${layerStyle}`, {}),
    get(theme, `textStyles.${textStyle}`, {}),
  ) as Dict

  return css({ ...styles, apply })(theme)
}

export default function isTag(target: any) {
  return (
    isString(target) &&
    (__DEV__ ? target.charAt(0) === target.charAt(0).toLowerCase() : true)
  )
}

export function getDisplayName(primitive: any) {
  return isTag(primitive) ? `chakra.${primitive}` : getComponentName(primitive)
}

function getComponentName(primitive: React.ComponentType | string) {
  return (
    (__DEV__ ? isString(primitive) && primitive : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    "ChakraComponent"
  )
}

export function forwardRef<P>(
  comp: (props: P, ref: React.Ref<any>) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ForwardRefComponent<P>
}
