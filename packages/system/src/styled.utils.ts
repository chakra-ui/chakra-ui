import { UnionStringArray, get, Dict } from "@chakra-ui/utils"
import { css, pseudoSelectors } from "@chakra-ui/parser"

export const domElements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
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
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "svg",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
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
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "webview",
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

export function truncateProp({ isTruncated }: any) {
  if (isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }
  }
}

export function applyProp(tag: React.ElementType) {
  return ({ theme, apply: applyProp }: any) => {
    const shouldAutoApply = theme?.settings?.autoApplyStylesToElements
    const defaultApply = !!shouldAutoApply ? `styles.${tag}` : undefined
    const apply = applyProp ?? defaultApply

    if (!apply) return undefined

    return css({ apply })(theme)
  }
}
