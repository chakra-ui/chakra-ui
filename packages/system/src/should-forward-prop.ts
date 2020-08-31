import { propNames } from "@chakra-ui/styled-system"
import { memoize } from "@chakra-ui/utils"

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */
const allPropNames = [
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
]

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */
const validHTMLProps = ["htmlWidth", "htmlHeight", "htmlSize"]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoize((prop: string) => {
    if (validHTMLProps.includes(prop)) return true
    return !regex.test(prop)
  })
}

export const shouldForwardProp = createShouldForwardProp(allPropNames)
