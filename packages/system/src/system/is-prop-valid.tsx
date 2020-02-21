import * as SS from "@styled-system/should-forward-prop"

// Prevent some prop from getting to the underlying DOM element
const shouldForwardProp = SS.createShouldForwardProp([
  //@ts-ignore
  ...SS.props,
  "d",
  "textDecoration",
  "pointerEvents",
  "visibility",
  "transform",
  "cursor",
  "fill",
  "stroke",
])

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

export const isValidHTMLProp = (value: any): value is keyof ValidHTMLProps =>
  value in validHTMLProps

export function isPropValid(prop: string): boolean {
  return prop in validHTMLProps ? true : shouldForwardProp(prop)
}

export default isPropValid
