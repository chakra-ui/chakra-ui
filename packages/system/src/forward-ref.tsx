/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
import * as React from "react"

type As = React.ElementType

type PropsOf<T extends As> = React.ComponentProps<T>

type AddProps<P> = React.PropsWithChildren<
  "transition" extends keyof P ? Omit<P, "transition"> : P
>

type AddTProps<T extends As> = "color" extends keyof PropsOf<T>
  ? Omit<PropsOf<T>, "color">
  : PropsOf<T>

export interface ComponentWithAs<T extends As, P> {
  <TT extends As>(
    props: { as?: TT } & AddProps<P> &
      Omit<PropsOf<TT>, keyof PropsOf<T>> &
      AddTProps<T>,
  ): JSX.Element
  displayName?: string
  propTypes?: React.WeakValidationMap<AddProps<P> & AddTProps<T>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: AddProps<P> & AddTProps<T> & { as?: As }
  id?: string
}

export function forwardRef<P, T extends As>(
  component: (
    props: React.PropsWithChildren<P> & Omit<PropsOf<T>, keyof P | "color">,
    ref: React.Ref<any>,
  ) => React.ReactElement | null,
) {
  return (React.forwardRef(component as any) as unknown) as ComponentWithAs<
    T,
    P
  >
}
