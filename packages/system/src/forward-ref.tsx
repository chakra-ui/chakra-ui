/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for this
 */
import * as React from "react"
import { ChakraProps } from "."

export type AssignableRef<T> =
  | {
      bivarianceHack(instance: T | null): void
    }["bivarianceHack"]
  | React.MutableRefObject<T | null>
  | null

type As<P = any> = React.ElementType<P>

export type PropsWithAs<P> = P & {
  as?: As
}

export type ComponentWithForwardedRef<
  T extends React.ElementType,
  P
> = React.ForwardRefExoticComponent<
  P & React.HTMLProps<React.ElementType<T>> & React.ComponentPropsWithRef<T>
>

export interface ChakraComponent<T extends As, P> {
  (
    props: { as?: As } & Omit<React.ComponentProps<T>, keyof P> &
      Omit<ChakraProps, keyof P> &
      P,
  ): React.ReactElement | null
  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<P>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<P>>
  /**
   * @private
   */
  id?: string
}

export function forwardRef<P, T extends As>(
  comp: (
    props: { as?: As } & React.ComponentProps<T> & P & ChakraProps,
    ref: React.RefObject<any>,
  ) => React.ReactElement | null,
): ChakraComponent<T, P> {
  return React.forwardRef(comp as any) as any
}
