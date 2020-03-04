import { propNames } from "@chakra-ui/parser"
import { Dict, memoizeOne } from "@chakra-ui/utils"
import isValidAttribute from "@emotion/is-prop-valid"

const allProps = [...propNames, "variant", "size", "colorScheme"]

function createShouldForwardProp(props: any) {
  const regex = new RegExp(`^(${props.join("|")})$`)
  return memoizeOne(
    (prop: string) => isValidAttribute(prop) && !regex.test(prop),
  )
}

const shouldForwardProp = createShouldForwardProp(allProps)

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
  return prop in validHTMLProps ? true : shouldForwardProp(prop)
}

export function filterProps(props: Dict) {
  const result: Dict = {}
  for (const prop in props) {
    if (!isPropValid(prop)) continue
    const propKey = isValidHTMLProp(prop) ? validHTMLProps[prop] : prop
    result[propKey] = props[prop]
  }
  return result
}

export function removeStyleProps(props: Dict) {
  for (const prop in props) {
    if (allProps.includes(prop)) {
      delete props[prop]
    }
  }
}

export function customShouldForwardProp(
  fn: (propName: string) => boolean,
  props: Dict,
) {
  const result: Dict = {}
  for (const prop in props) {
    if (fn(prop)) {
      result[prop] = props[prop]
    }
  }
  return result
}
