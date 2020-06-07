import * as React from "react"
import { pseudoSelectors } from "@chakra-ui/parser"
import { css } from "@chakra-ui/css"
import {
  isString,
  UnionStringArray,
  __DEV__,
  isNumber,
  get,
} from "@chakra-ui/utils"
import { ChakraComponent, As, WithAs } from "./system.types"

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export const domElements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "button",
  "caption",
  "cite",
  "circle",
  "code",
  "col",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
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
  "i",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "nav",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "path",
  "picture",
  "pre",
  "q",
  "rect",
  "s",
  "svg",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "u",
  "ul",
  "video",
] as const

export type DOMElements = UnionStringArray<typeof domElements>

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

export function layerStyleProp({ layerStyle, textStyle, theme }: any) {
  if (layerStyle) {
    return get(theme, `layerStyles.${layerStyle}`)
  }
  if (textStyle) {
    return get(theme, `textStyles.${textStyle}`)
  }
}

export function applyProp(tag: React.ElementType) {
  return (props: any) => {
    const { theme, apply: applyProp } = props
    const shouldAutoApply = theme?.config?.shouldMapElementToStyles
    const defaultApply = !!shouldAutoApply ? `styles.${tag}` : undefined
    const apply = applyProp ?? defaultApply

    if (!apply) return undefined

    /**
     * css function knows how to resolve the `apply` prop
     * so need to use `get(...)` function.
     */
    return css({ apply })(theme)
  }
}

export default function isTag(target: any) {
  return (
    isString(target) &&
    (__DEV__ ? target.charAt(0) === target.charAt(0).toLowerCase() : true)
  )
}

/**
 * Get the display name of a component.
 * It's really useful when debugging in Dev Tools.
 *
 * @param primitive the react element or component type
 */
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

export function forwardRef<P, T extends As, O extends string = "">(
  comp: (props: P, ref: React.Ref<any>) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ChakraComponent<T, P, O>
}
