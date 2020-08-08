import { propNames } from "@chakra-ui/styled-system"
import { memoizeOne } from "@chakra-ui/utils"

/**
 * List of props to omit from DOM.
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
  return memoizeOne((prop: string) => !regex.test(prop))
}

export const shouldForwardProp = createShouldForwardProp(allPropNames)
