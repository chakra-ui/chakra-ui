import { isString, omit, UnionStringArray, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ThemingProps } from "./system.types"

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

export function omitThemingProps<T extends ThemingProps>(props: T) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"])
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
