import { propNames } from "@chakra-ui/styled-system"

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */
const allPropNames = new Set([
  ...propNames,
  "textStyle",
  "layerStyle",
  "apply",
  "isTruncated",
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
const validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"])

export const shouldForwardProp = (prop: string): boolean =>
  validHTMLProps.has(prop) || !allPropNames.has(prop)
