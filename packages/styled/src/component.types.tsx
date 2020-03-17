import * as React from "react"

export type JSXElements = keyof JSX.IntrinsicElements

type JSXConstructor = React.JSXElementConstructor<any>

export type As = React.ElementType<any>

export type PropsOf<
  T extends JSXElements | JSXConstructor
> = JSX.LibraryManagedAttributes<T, React.ComponentPropsWithRef<T>>

export type PropsWithAs<P, T extends As> = P &
  Omit<PropsOf<T>, "as" | keyof P> & {
    as?: T
  }

export type Component<T extends As, P> = {
  <TT extends As>(props: PropsWithAs<PropsOf<T>, TT> & P): JSX.Element
  (props: PropsWithAs<{}, T> & P): JSX.Element
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsOf<T> & P>
  defaultProps?: Partial<PropsOf<T> & P>
}
