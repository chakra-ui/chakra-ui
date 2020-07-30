import { propNames } from "@chakra-ui/styled-system"
import { memoizeOne } from "@chakra-ui/utils"
import isValid from "@emotion/is-prop-valid"

const allPropNames = [
  ...propNames,
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "__css",
  "sx",
]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoizeOne((prop: string) => isValid(prop) && !regex.test(prop))
}

export const shouldForwardProp = createShouldForwardProp(allPropNames)
