import { css, CSSObject } from "@chakra-ui/css"
import { pseudoSelectors } from "@chakra-ui/parser"
import {
  Dict,
  get,
  isNumber,
  isString,
  runIfFn,
  UnionStringArray,
  __DEV__,
} from "@chakra-ui/utils"
import * as React from "react"
import { getComponentStyles } from "./component"
import { As, ForwardRefComponent, Options } from "./system.types"

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

export function forwardRef<P>(
  comp: (props: P, ref: React.Ref<any>) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ForwardRefComponent<P>
}

export function componentProps<T extends As, P = {}>(options?: Options<T, P>) {
  return (propsWithTheme: any): CSSObject => {
    let computedStyles: CSSObject = {}
    const { theme } = propsWithTheme
    /**
     * Users can pass a base style to the component options.
     *
     * @example
     * const Button = chakra("button", {
     *  baseStyle: {
     *    margin: 4,
     *    color: "red.300"
     *  }
     * })
     */
    if (options?.baseStyle) {
      const baseStyleObject = runIfFn(options.baseStyle, propsWithTheme)
      const baseStyle = css(baseStyleObject as Dict)(theme)
      computedStyles = { ...computedStyles, ...baseStyle } as CSSObject
    }

    /**
     * Users can pass a theme key to reference styles in the theme
     * Styles will be read from `theme.components.<themeKey>`
     *
     * @example
     * const Button = chakra("button", {
     *  themeKey: "Button"
     * })
     */
    if (options) {
      const styles = getComponentStyles(propsWithTheme, options)
      computedStyles = { ...computedStyles, ...styles } as CSSObject
    }

    return computedStyles
  }
}
