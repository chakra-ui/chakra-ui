/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for this
 */
import * as React from "react"

type As = string | React.ComponentType<any>

export type PropsWithAs<T extends As, P> = P &
  Omit<ComponentPropsWithRef<T>, "as" | "color" | keyof P> & {
    as?: T | As
  }

type ComponentPropsWithRef<T extends As> = T extends React.ComponentClass<
  infer P
>
  ? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>> // @ts-expect-error
  : React.PropsWithRef<React.ComponentProps<T>>

export interface ComponentWithAs<T extends As, P> {
  <TT extends As = T>(props: PropsWithAs<TT, P>): React.ReactElement | null
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
    props: PropsWithAs<T, Omit<P, "children" | "as">>,
    ref: React.RefObject<any>,
  ) => React.ReactElement | null,
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<
    T,
    Omit<P, "children" | "as">
  >
}
