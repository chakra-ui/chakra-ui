import { propNames } from "@chakra-ui/parser"
import { Dict, memoizeOne, omit } from "@chakra-ui/utils"
import isValidAttribute from "@emotion/is-prop-valid"

const stylePropNames = [
  ...propNames,
  "variant",
  "size",
  "colorScheme",
  "orientation",
]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoizeOne(
    (prop: string) => isValidAttribute(prop) && !regex.test(prop),
  )
}

const shouldForwardProp = createShouldForwardProp(stylePropNames)

export type ValidHTMLProps = {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlSize?: string | number
}

export const validHTMLProps = {
  htmlWidth: "width",
  htmlHeight: "height",
  htmlSize: "size",
}

const isValidHTMLProp = (value: any): value is keyof ValidHTMLProps =>
  value in validHTMLProps

function isPropValid(prop: string): boolean {
  const shouldPassThrough =
    prop in validHTMLProps || prop === "sx" || prop === "css"
  return shouldPassThrough ? true : shouldForwardProp(prop)
}

export function filterProps(props: Dict) {
  const validProps: Dict = {}
  for (const prop in props) {
    if (!isPropValid(prop)) continue
    const propKey = isValidHTMLProp(prop) ? validHTMLProps[prop] : prop
    validProps[propKey] = props[prop]
  }
  return validProps
}

export function removeStyleProps(props: Dict) {
  return omit(props, stylePropNames) as Dict
}

export function customShouldForwardProp(
  fn: (propName: string) => boolean,
  props: Dict,
) {
  const validProps: Dict = {}
  for (const prop in props) {
    if (fn(prop)) {
      validProps[prop] = props[prop]
    }
  }
  return validProps
}
