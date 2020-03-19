import * as React from "react"

export type Merge<T1, T2> = Omit<T1, Extract<keyof T1, keyof T2>> & T2

export type SafeMerge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type As<P = any> = React.ReactType<P>

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

export type Dict<T = any> = Record<string, T>
