import * as React from "react"

export type AssignableRef<T> =
  | {
      bivarianceHack(instance: T | null): void
    }["bivarianceHack"]
  | React.MutableRefObject<T | null>
  | null

export type As<P = any> = React.ElementType<P>

export type PropsWithAs<T extends As, P> = P &
  Omit<React.ComponentPropsWithRef<T>, "as" | keyof P> & {
    as?: T
  }

export type PropsFromAs<T extends As, P> = (PropsWithAs<T, P> & { as: T }) &
  PropsWithAs<T, P>

export type ComponentWithForwardedRef<
  T extends React.ElementType,
  P
> = React.ForwardRefExoticComponent<
  P & React.HTMLProps<React.ElementType<T>> & React.ComponentPropsWithRef<T>
>

export interface ComponentWithAs<T extends As, P> {
  <TT extends As>(props: PropsWithAs<TT, P>): JSX.Element
  (props: PropsWithAs<T, P>): JSX.Element
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<T, P>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<T, P>>
}

export function forwardRefWithAs<P, T extends As>(
  comp: (props: PropsFromAs<T, P>, ref: React.RefObject<any>) => JSX.Element,
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<T, P>
}
