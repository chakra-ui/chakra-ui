import type { ElementType, ForwardRefRenderFunction } from "react"
import {
  Assign,
  forwardRef as forwardReactPolymorphic,
  PropsOf,
} from "@polymorphic-factory/react"

export function forwardRef<
  // It's pretty much the same as the original from @polymorphic-factory/react,
  // but the positions of the generics are swapped
  Props extends Record<never, never> = Record<never, never>,
  Component extends ElementType = ElementType,
>(
  component: ForwardRefRenderFunction<
    never,
    Assign<PropsOf<Component>, Props> & {
      as?: ElementType
    }
  >,
) {
  return forwardReactPolymorphic<Component, Props>(component)
}
