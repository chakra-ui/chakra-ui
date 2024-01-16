import { getPropNames } from "@chakra-ui/styled-system"

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */
const allPropNames = new Set([
  ...getPropNames({}),
  "textStyle",
  "layerStyle",
  "apply",
  "noOfLines",
  "focusBorderColor",
  "errorBorderColor",
  "as",
  "__css",
  "css",
  "sx",
])

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */
const validHTMLProps = new Set([
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "htmlTranslate",
])

export function shouldForwardProp(prop: string): boolean {
  return (
    (validHTMLProps.has(prop) || !allPropNames.has(prop)) && prop[0] !== "_"
  )
}
