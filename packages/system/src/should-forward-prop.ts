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
  return memoizeOne((prop: string) => isValid(prop) && !regex.test(prop))
}

const shouldForwardProp = createShouldForwardProp(stylePropNames)

export interface ValidHTMLProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlSize?: string | number
}

export const validHTMLProps = {
  htmlWidth: "width",
  htmlHeight: "height",
  htmlSize: "size",
}

export function isPropValid(prop: string) {
  const shouldPassThrough =
    prop in validHTMLProps || ["sx", "css"].includes(prop)
  return shouldPassThrough ? true : shouldForwardProp(prop)
}
