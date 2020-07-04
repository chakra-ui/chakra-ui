import { propNames } from "@chakra-ui/parser"
import { memoizeOne } from "@chakra-ui/utils"
import isValid from "@emotion/is-prop-valid"

const stylePropNames = [
  ...propNames,
  "variant",
  "size",
  "colorScheme",
  "orientation",
]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoizeOne((prop: string) => {
    const cond1 = isValid(prop) && !regex.test(prop)
    const cond2 = ["htmlWidth", "htmlHeight", "htmlSize"].includes(prop)
    return cond1 || cond2
  })
}

export const shouldForwardProp = createShouldForwardProp(stylePropNames)
