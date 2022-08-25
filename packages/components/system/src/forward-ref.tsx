/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which we improved on
 */
import { forwardRef as forwardReactRef } from "react"
import { As, ComponentWithAs, PropsOf, RightJoinProps } from "./system.types"

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As
    }
  >,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >
}
