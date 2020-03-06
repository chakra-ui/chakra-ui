import * as React from "react"

export type Merge<T1, T2> = Omit<T1, Extract<keyof T1, keyof T2>> & T2

export type SafeMerge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type RenderProp<P = {}> = { children: (props: P) => React.ReactNode }

export type As<P = any> = React.ReactType<P>

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

export type Dict<T = any> = Record<string, T>

// Credits to Jared Palmer for this: https://gist.github.com/jaredpalmer/80982b3d787359762506fce578108358

type PropsWithAs<T extends As, P> = P &
  Omit<React.ComponentPropsWithRef<T>, "as" | keyof P> & {
    as?: T
  }

type PropsFromAs<T extends As, P> = (PropsWithAs<T, P> & { as: T }) &
  PropsWithAs<T, P>

export interface ComponentWithAs<T extends As, P> {
  <TT extends As>(props: PropsWithAs<TT, P>): React.ReactElement | null
  (props: PropsWithAs<T, P>): React.ReactElement | null

  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<T, P>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<T, P>>
}

export function forwardRefWithAs<P, T extends As>(
  comp: (
    props: PropsFromAs<T, P>,
    ref: React.RefObject<any>,
  ) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<T, P>
}
