import * as React from "react"

export type SafeMerge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type As<P = any> = React.ElementType<P>

export type LiteralUnion<T extends U, U extends any = string> =
  | T
  | (U & { _?: never })

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

export type Dict<T = any> = Record<string, T>

export type ReactNodeOrRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode)

export type Booleanish = boolean | "true" | "false"

export type StringOrNumber = string | number

export type HTMLProps<T = any> = Omit<
  React.HTMLAttributes<T>,
  "color" | "width" | "height"
> &
  React.RefAttributes<T>

export type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: SafeMerge<HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>,
) => SafeMerge<HTMLProps<T>, P>
