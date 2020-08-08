import { propNames } from "@chakra-ui/styled-system"
import { memoize } from "@chakra-ui/utils"

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */
const allPropNames = [
  ...propNames,
  "htmlWidth",
  "htmlHeight",
  "textStyle",
  "layerStyle",
  "apply",
  "isTruncated",
  "noOfLines",
  "htmlSize",
  "focusBorderColor",
  "errorBorderColor",
  "as",
  "__css",
  "css",
  "sx",
]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoize((prop: string) => !regex.test(prop))
}

export const shouldForwardProp = createShouldForwardProp(allPropNames)
