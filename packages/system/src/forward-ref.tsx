/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
import * as React from "react"
import type { As } from "./system.types"

type OmittedProps = "transition"

type PropsWithAs<Props = {}, Component extends As = As> = Props &
  Omit<React.ComponentProps<Component>, "as" | keyof Props | OmittedProps> & {
    as?: Component
  }

export type ComponentWithAs<Component extends As, Props> = {
  <Component extends As>(
    props: PropsWithAs<Props, Component> & { as?: Component },
  ): JSX.Element

  displayName?: string
  propTypes?: React.WeakValidationMap<PropsWithAs<Props, Component>>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<PropsWithAs<Props, Component>>
  id?: string
}

export function forwardRef<Props, Component extends As>(
  component: React.ForwardRefRenderFunction<any, any>,
) {
  return (React.forwardRef(component) as unknown) as ComponentWithAs<
    Component,
    Props
  >
}
