/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for this
 */
import * as React from "react"

export type AssignableRef<T> =
  | {
      bivarianceHack(instance: T | null): void
    }["bivarianceHack"]
  | React.MutableRefObject<T | null>
  | null

type As<P = any> = React.ElementType<P>

export type PropsWithAs<T extends As, P> = P &
  Omit<React.ComponentPropsWithRef<T>, "as" | "color" | keyof P> & {
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
  <TT extends As>(props: PropsWithAs<TT, P>): React.ReactElement | null
  (props: PropsWithAs<T, P>): React.ReactElement | null
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<T, P>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<T, P>>
  /**
   * @private
   */
  id?: string
}

export function forwardRef<P, T extends As>(
  comp: (
    props: PropsFromAs<T, Omit<P, "children" | "as">>,
    ref: React.RefObject<any>,
  ) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<
    T,
    Omit<P, "children" | "as">
  >
}
