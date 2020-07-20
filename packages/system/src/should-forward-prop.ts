import { propNames } from "@chakra-ui/styled-system"
import { memoizeOne } from "@chakra-ui/utils"

const exceptions = ["htmlWidth", "htmlHeight", "htmlSize"]

function createShouldForwardProp(props: string[]) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoizeOne(
    (prop: string) => !regex.test(prop) || exceptions.includes(prop),
  )
}

export const shouldForwardProp = createShouldForwardProp(propNames)
