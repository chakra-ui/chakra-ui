import * as React from "react"
import { DOMElements } from "./dom-elements"
import { SystemProps, ValidHTMLProps } from "../system"

export type As<P = any> = React.ReactType<P>

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>

type MergePropsOf<P, T extends As> = {} extends P
  ? Omit<P, keyof PropsOf<T>> & PropsOf<T>
  : PropsOf<T>

export interface OtherProps extends ValidHTMLProps {
  as?: React.ElementType
  isTruncated?: boolean
  children?: React.ReactNode
  apply?: string
}

export interface ChakraComponent<T extends As, O = {}> {
  <P>(props: MergePropsOf<P, T> & SystemProps & OtherProps & O): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsOf<T> & SystemProps & OtherProps>
}

export type HTMLChakraComponents = {
  [K in DOMElements]: ChakraComponent<K>
}

export interface ChakraOptions {
  apply?: string
}
